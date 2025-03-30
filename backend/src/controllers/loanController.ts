import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types/AuthRequest";

const prisma = new PrismaClient();

/**
 * Approve a loan and create a loan record
 */
export const approveAndCreateLoan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { appId } = req.params;
    const authReq = req as AuthRequest;
    const adminId = authReq.user?.userId;

    if (!adminId) {
      res.status(401).json({ message: "Unauthorized: Admin ID missing" });
      return;
    }

    const application = await prisma.application.findUnique({ where: { id: appId } });
    if (!application) {
      res.status(404).json({ message: "Application not found or already processed" });
      return;
    }

    // Approve the application
    await prisma.application.update({
      where: { id: appId },
      data: { status: "APPROVED", approvedBy: { connect: { id: adminId } } },
    });

    // Loan EMI Calculation with interest
    const annualInterestRate = 12;
    const tenureMonths = application.tenure;
    const principal = application.amount;
    const monthlyRate = annualInterestRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    
    const loan = await prisma.loan.create({
      data: {
        applicationId: appId,
        userId: application.userId,
        interestRate: annualInterestRate,
        principalLeft: principal,
        tenureMonths,
        emi,
      },
    });

    res.status(201).json({ message: "Loan Approved & Created", loan });
  } catch (error) {
    console.error("Error approving loan:", error);
    next(error);
  }
};

/**
 * User makes EMI payment
 */
export const makeEMIPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { loanId } = req.params;
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID missing" });
      return;
    }

    const loan = await prisma.loan.findUnique({ where: { id: loanId } });
    if (!loan || loan.isPaid) {
      res.status(404).json({ message: "Loan not found or already paid" });
      return;
    }

    const newPrincipalLeft = loan.principalLeft - loan.emi;

    // Create a new transaction
    await prisma.transaction.create({
      data: {
        loanId,
        amount: loan.emi,
        monthYear: new Date().toISOString().substring(0, 7)
      }
    });

    // Update loan balance
    await prisma.loan.update({
      where: { id: loanId },
      data: {
        principalLeft: newPrincipalLeft,
        isPaid: newPrincipalLeft <= 0
      }
    });

    res.status(200).json({ message: "EMI Payment Successful", newBalance: newPrincipalLeft });
  } catch (error) {
    console.error("Error making EMI payment:", error);
    next(error);
  }
};

/**
 * Get Loan Details
 */
export const getLoanDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { loanId } = req.params;
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: { transactions: true }
    });

    if (!loan) {
      res.status(404).json({ message: "Loan not found" });
      return;
    }

    res.status(200).json(loan);
  } catch (error) {
    console.error("Error fetching loan details:", error);
    next(error);
  }
};


export const getUserLoans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("🔹 getUserLoans API called");

    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    console.log("🔹 Extracted userId:", userId);

    if (!userId) {
      console.log("❌ Unauthorized request: User ID missing");
      res.status(401).json({ message: "Unauthorized: User ID missing" });
      return;
    }

    // ✅ Fetch loans directly using userId
    const loans = await prisma.loan.findMany({
      where: { userId },
      include: {
        transactions: true, // Include EMI transactions
        application: true, // Include application details
      },
    });

    console.log("🔹 Loans fetched successfully:", loans);

    if (loans.length === 0) {
      console.log("❌ No loans found for this user");
      res.status(404).json({ message: "No loans found for this user" });
      return;
    }

    res.status(200).json({ message: "User loans fetched successfully", loans });
  } catch (error) {
    console.error("❌ Error fetching user loans:", error);
    next(error);
  }
};


export const getUserTotalLoanAmount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("🔹 getUserTotalLoanAmount API called");

    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    console.log("🔹 Extracted userId:", userId);

    if (!userId) {
      console.log("❌ Unauthorized request: User ID missing");
      res.status(401).json({ message: "Unauthorized: User ID missing" });
      return;
    }

    // ✅ Fetch all loans and ensure all values are non-negative
    const loans = await prisma.loan.findMany({
      where: { userId },
      select: { principalLeft: true },
    });

    console.log("🔹 Loans fetched successfully:", loans);

    if (loans.length === 0) {
      console.log("❌ No loans found for this user");
      res.status(404).json({ message: "No loans found for this user" });
      return;
    }

    
    const totalAmount = loans.reduce((sum, loan) => sum + Math.max(loan.principalLeft,0), 0);

    res.status(200).json({ 
      message: "Total loan amount calculated successfully", 
      totalAmount 
    });
  } catch (error) {
    console.error("❌ Error calculating total loan amount:", error);
    next(error);
  }
};



export const getLoanStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("🔹 getLoanStatistics API called");

    // ✅ Fetch total loan count
    const totalLoans = await prisma.loan.count();
    console.log("🔹 Total loans count:", totalLoans);

    // ✅ Fetch total users count
    const totalUsers = await prisma.user.count();
    console.log("🔹 Total users count:", totalUsers);

    // ✅ Fetch total cash disbursed (sum of all approved loan amounts)
    const disbursedCash = await prisma.application.aggregate({
      where: { status: "APPROVED" },
      _sum: { amount: true },
    });
    const totalDisbursedCash = disbursedCash._sum.amount ?? 0;
    console.log("🔹 Total cash disbursed:", totalDisbursedCash);

    // ✅ Calculate savings: (total approved + interest) - approved amount
    const approvedLoans = await prisma.loan.findMany({
      select: { principalLeft: true, interestRate: true, tenureMonths: true },
    });

    let totalSavings = 0;
    approvedLoans.forEach((loan) => {
      const interest = (loan.principalLeft * loan.interestRate * loan.tenureMonths) / 100;
      totalSavings += interest;
    });
    console.log("🔹 Total savings:", totalSavings);

    // ✅ Fetch count of fully repaid loans (where principalLeft is 0 or less)
    const repaidLoansCount = await prisma.loan.count({
      where: { principalLeft: { lte: 0 } },
    });
    console.log("🔹 Fully repaid loans count:", repaidLoansCount);

   
    const totalCashReceived = totalSavings + totalDisbursedCash;
    console.log("🔹 Total cash received:", totalCashReceived);

    res.status(200).json({
      message: "Loan statistics retrieved successfully",
      totalLoans,
      totalUsers,
      totalDisbursedCash,
      totalSavings,
      repaidLoansCount,
      totalCashReceived,
    });
  } catch (error) {
    console.error("❌ Error fetching loan statistics:", error);
    next(error);
  }
};

