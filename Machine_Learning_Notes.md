

# 📚 Machine Learning Exam Notes

## Chapter 1: Linear Regression

### 🔹 Introduction
Linear Regression is a **supervised machine learning** algorithm used for **predicting continuous numerical values** based on the relationship between dependent and independent variables.

It assumes a linear relationship between the variables, meaning the change in output is proportional to the change in input.

---

### 🔹 Key Concepts
- **Dependent Variable (Y):** The target we want to predict.
- **Independent Variable (X):** The input features.
- **Line Equation:**  
  \[
  Y = mX + c
  \]
  Where:
  - \( m \) = slope of the line (how steep)
  - \( c \) = y-intercept (where the line crosses the y-axis)

---

### 🔹 Objective
Minimize the **error** between actual and predicted values using a **loss function**.

Common loss function:
- **Mean Squared Error (MSE)**:  

$$
\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

Where:
- $y_i$ = actual value  
- $\hat{y}_i$ = predicted value


**Goal:** Find the best \( m \) and \( c \) that minimizes MSE.

---

### 🔹 Example

**Problem:**  
Predict the price of a house based on its size (in sqft).

| Size (sqft) | Price (in $1000s) |
|:-----------:|:-----------------:|
| 1000        | 300               |
| 1500        | 400               |
| 2000        | 500               |

Linear Regression will learn a line like:  
$$
\text{Price} = 0.2 \times \text{Size} + 100
$$

Thus, for a house of 1800 sqft, predicted price:  
$$
0.2 \times 1800 + 100 = 460
$$  
($460,000)


---

### 🔹 Important Diagram (Imagine)
```
Price (y-axis)
|
|                        .
|                  .
|             .
|        .
|    .
|________________________ Size (x-axis)
```
➔ A straight best-fit line through the data points.

---

### 🔹 Advantages
- Easy to understand and implement.
- Fast and computationally efficient.
- Works well when the data has a linear relationship.

---

### 🔹 Disadvantages
- Sensitive to outliers.
- Cannot capture complex non-linear relationships.
- Assumes constant variance of errors (homoscedasticity).

---

### 🔹 Short Tricks to Remember
✅ "Best Fit Line" = Linear Regression.  
✅ "Predict Numbers" = Linear Regression.  
✅ "Minimize Squared Error" = Goal of Linear Regression.

---

### 🔹 Quick MCQs (Practice)

**1. What type of output does Linear Regression predict?**  
a) Categories  
b) Continuous Values ✅  
c) Images  

**2. What is the equation form of Linear Regression?**  
a) \( Y = mX + c \) ✅  
b) \( Y = X^2 \)  
c) \( Y = e^X \)  

**3. What is the loss function used in Linear Regression?**  
a) Mean Squared Error ✅  
b) Cross Entropy  
c) Hinge Loss  


Awesome! 🚀  
Jumping into **Chapter 2: K-Nearest Neighbors (KNN)** immediately.

Here’s your complete notes:

---

# 📚 Machine Learning Exam Notes

## Chapter 2: K-Nearest Neighbors (KNN)

### 🔹 Introduction
K-Nearest Neighbors (KNN) is a **supervised learning algorithm** used for **classification and regression** problems.  
It works by **finding the "k" closest points** to a new input and **making predictions based on their values**.

**Main idea:**  
> "A data point is likely to belong to the same category as its neighbors."

---

### 🔹 How KNN Works
1. Choose the number \( k \) (number of neighbors).
2. Calculate distance (usually **Euclidean Distance**) between new point and all training data.
3. Pick the **k nearest neighbors**.
4. - **For classification:** Assign the most common class among neighbors.
   - **For regression:** Take the average of neighbors' values.

---

### 🔹 Important Formulas

**Euclidean Distance Formula:**  
For two points $ (x_1, y_1) $ and $ (x_2, y_2) $,
$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

**Manhattan Distance Formula:**  
$$
d = |x_2 - x_1| + |y_2 - y_1|
$$

---

### 🔹 Example

Suppose you have:

| Height (cm) | Weight (kg) | Class |
|:-----------:|:-----------:|:-----:|
| 180         | 80          | Male  |
| 160         | 55          | Female|
| 170         | 65          | Male  |

You want to predict for (165, 60).

- Find distances.
- Pick \( k=3 \) nearest neighbors.
- Vote:  
  - Male: 2 votes  
  - Female: 1 vote  

Thus, classified as **Male**.

---

### 🔹 Important Diagram (Imagine)
```
(X and Y axis showing points)
New point ➔ find nearest dots ➔ majority voting
```
➔ Circle around the "k" nearest neighbors.

---

### 🔹 Advantages
- Simple to understand and easy to implement.
- No training phase (lazy learner).
- Works well with smaller datasets.

---

### 🔹 Disadvantages
- Slow for large datasets (computes distance to every point).
- Sensitive to irrelevant features and the choice of k.
- Curse of dimensionality in high dimensions.

---

### 🔹 Short Tricks to Remember
✅ "Neighbors decide my fate!"  
✅ "No model training — only distance calculation!"  
✅ "Odd k avoids tie situations."

---

### 🔹 Tips for Choosing 'k'
- Small \( k \): More sensitive to noise.
- Large \( k \): Smoother decision boundaries.
- Generally choose odd \( k \) to avoid ties in classification.

---

### 🔹 Quick MCQs (Practice)

**1. KNN belongs to which type of learning?**  
a) Supervised ✅  
b) Unsupervised  
c) Reinforcement  

**2. What does KNN use to make predictions?**  
a) Decision trees  
b) Distances ✅  
c) Gradients  

**3. What happens if you choose very large \( k \)?**  
a) Overfitting  
b) Underfitting ✅  
c) No effect  


---

# 📚 Machine Learning Exam Notes

## Chapter 3: Decision Trees

### 🔹 Introduction
Decision Trees are a **supervised learning** method for both **classification** and **regression**. They split the data into subsets based on feature values, forming a tree of decisions that leads to predictions at the leaves.

---

### 🔹 Key Concepts
- **Root Node:** Where the tree starts.  
- **Internal Nodes:** Represent feature tests (questions).  
- **Branches:** Outcomes of those tests.  
- **Leaf Nodes:** Final prediction (class label or value).

The tree “grows” by choosing the feature split that best separates the data at each node.

---

### 🔹 Splitting Criteria & Formulas

1. **Entropy (Information Gain criterion)**  
   Measures impurity in a node:  
   

$$
H(S) = -\sum_{i=1}^{c} p_i \log_2 p_i
$$

- $p_i$ = proportion of class $i$ in the set.

**Information Gain:**

$$
IG(S, A) = H(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} H(S_v)
$$


   

2. **Gini Impurity**  
   Alternative to entropy:  
   $G(S) = 1 - \sum_{i=1}^{c} p_i^2$

   Lower Gini means purer nodes.

---

### 🔹 Example

**Dataset:** Predict whether to **Play Tennis** based on **Outlook**.

| Outlook  | Play? |
|:--------:|:-----:|
| Sunny    | No    |
| Overcast | Yes   |
| Rain     | Yes   |

- **Step 1:** Compute parent entropy.  
- **Step 2:** Calculate entropy for each Outlook value subset.  
- **Step 3:** Compute Information Gain = Parent Entropy – Weighted Child Entropies.  
- **Step 4:** Choose the split with highest IG (e.g., Outlook).

Resulting tree:
```
[Root: Outlook]
 ├─ Sunny → Leaf: No
 ├─ Overcast → Leaf: Yes
 └─ Rain → Leaf: Yes
```

---

### 🔹 Advantages & Disadvantages

**Advantages:**  
- Intuitive and easy to visualize.  
- Handles both numeric and categorical features.

**Disadvantages:**  
- Prone to overfitting (trees can grow too complex).  
- Small changes in data can produce very different trees.

---

### 🔹 Short Tricks to Remember
✅ “20 Questions Game” – each node asks a question.  
✅ “Entropy is chaos” – higher entropy → more mixed classes.

---

### 🔹 Quick MCQs (Practice)

1. **Which criterion measures impurity using probabilities and logarithms?**  
   a) Gini Impurity  
   b) Entropy ✅  
   c) Euclidean Distance  

2. **Information Gain is calculated as:**  
   a) Sum of child entropies  
   b) Parent entropy minus weighted child entropies ✅  
   c) Product of parent and child entropies  

3. **A major risk of unpruned decision trees is:**  
   a) Underfitting  
   b) Overfitting ✅  
   c) Slow training  

---

---

# 📚 Machine Learning Exam Notes

## Chapter 4: Naïve Bayes

### 🔹 Introduction  
Naïve Bayes is a **probabilistic supervised** learning algorithm based on **Bayes’ Theorem**, which assumes that all features are independent given the class label. It’s widely used for **text classification** (e.g., spam detection).

---

### 🔹 Key Concepts  
- **Prior Probability** $P(C)$: Probability of class $C$ before seeing data.  
- **Likelihood** $P(X|C)$: Probability of observing features $X$ given class $C$.  
- **Evidence** $P(X)$: Overall probability of observing features $X$.  
- **Posterior Probability** $P(C|X)$: Updated probability of class $C$ after observing $X$.

**Bayes’ Theorem:**  
$$
P(C|X) = \frac{P(X|C)P(C)}{P(X)}
$$

Since $P(X)$ is constant across classes, we compare:  
$$
\hat{C} = \arg\max_{C} P(X|C) P(C)
$$

---

### 🔹 Example: Spam Detection  
Suppose you have these training counts:

| Feature         | Spam Emails (out of 40) | Ham Emails (out of 60) |
|-----------------|-------------------------|------------------------|
| Contains “free” | 30                      | 10                     |
| Contains “win”  | 20                      | 15                     |

- **P(Spam) = 40/100 = 0.4**  
- **P(Ham) = 60/100 = 0.6**
For a new email that contains both “free” and “win”:

$$
P(\text{Spam}|\text{free, win}) \; \propto \; P(\text{free}|\text{Spam}) \times P(\text{win}|\text{Spam}) \times P(\text{Spam})
= \frac{30}{40} \times \frac{20}{40} \times 0.4 = 0.15
$$

$$
P(\text{Ham}|\text{free, win}) \; \propto \; \frac{10}{60} \times \frac{15}{60} \times 0.6 = 0.025
$$

Since $0.15 > 0.025$, classify as **Spam**.


### 🔹 Important Diagram (Imagine)
```
            +-------+
Features -> | Naïve | -> Class probabilities
            | Bayes |
            +-------+
```
➔ Feature independence lets each word vote separately.

---

### 🔹 Advantages & Disadvantages

**Advantages:**  
- Extremely fast to train and predict.  
- Works well with high-dimensional data (text).  
- Requires relatively small amount of training data.

**Disadvantages:**  
- “Naïve” assumption of feature independence is often violated.  
- Zero probabilities if a word never appears in training (use Laplace smoothing).

---

### 🔹 Short Tricks to Remember  
✅ “Bayes updates your beliefs.”  
✅ “Naïve because features behave independently.”  
✅ “Good for Spam vs. Ham!”

---

### 🔹 Quick MCQs (Practice)

1. **Which assumption does Naïve Bayes make?**  
   a) Features are dependent  
   b) Features are independent ✅  
   c) Classes are continuous  

2. **In Bayes’ Theorem, what is \(P(C)\)?**  
   a) Likelihood  
   b) Prior probability ✅  
   c) Posterior probability  

3. **When a feature never appears in training for a class, you should use:**  
   a) No adjustment  
   b) Laplace smoothing ✅  
   c) Increase dataset size  

---


---

# 📚 Machine Learning Exam Notes

## Chapter 5: Support Vector Machines (SVM)

### 🔹 Introduction  
Support Vector Machines (SVM) are a powerful supervised learning algorithm primarily used for **classification**, although they can be adapted for **regression**. SVM works by finding the **hyperplane** that best separates the data points of different classes in a high-dimensional space.

---

### 🔹 Key Concepts
- **Hyperplane:** A decision boundary that separates classes.
- **Support Vectors:** Data points that are closest to the hyperplane, and which determine the position of the hyperplane.
- **Margin:** The distance between the hyperplane and the support vectors. SVM maximizes this margin to improve classification.

---

### 🔹 Formulas

1. **Equation of the Hyperplane:**  
   The hyperplane in $n$-dimensional space is defined by:  
   $$
   w \cdot x + b = 0
   $$  
   Where:  
   - $w$ = weight vector  
   - $b$ = bias  

2. **Maximizing the Margin:**  
   The goal is to maximize the margin:  
   $$
   \text{Margin} = \frac{2}{\|w\|}
   $$  
   The optimization problem is then:  
   $$
   \text{Minimize} \; \frac{1}{2} \|w\|^2
   $$  
   Subject to constraints that the data points are correctly classified.


---

### 🔹 Example: 2D Classification

Suppose you have two classes of points, **Red** and **Blue**, in a 2D space. SVM will:
1. Find the line (hyperplane) that best separates the two classes.
2. Ensure that the distance from the nearest Red and Blue points to the line is maximized.

For a set of points, SVM might find a line:
```
Red |-----------------------| Blue
```
Where the line divides the two classes with maximum margin.

---

### 🔹 Important Diagram (Imagine)
```
Support Vectors (red and blue points) determine the Hyperplane.
           /-------------------> Hyperplane
          /          Margin
  Red --|----------------------------|-- Blue
         \       Support Vectors    /
```

---

### 🔹 Types of SVM

1. **Linear SVM:**  
   Used when the data is linearly separable, i.e., a straight line or hyperplane can perfectly separate the classes.

2. **Non-linear SVM:**  
   When data is not linearly separable, SVM can be adapted using **kernels** to transform data into a higher-dimensional space where it can be linearly separated.

   Common kernels:
   - **Polynomial kernel**
   - **Radial Basis Function (RBF) kernel**

---

### 🔹 Advantages & Disadvantages

**Advantages:**  
- Works well for high-dimensional data.  
- Effective in cases where there is a clear margin of separation.  
- Robust to overfitting, especially in high-dimensional space.

**Disadvantages:**  
- Computationally expensive, especially with large datasets.  
- Choice of kernel and regularization parameter \(C\) significantly affects performance.  
- Harder to interpret compared to simpler algorithms like decision trees.

---

### 🔹 Short Tricks to Remember  
✅ “Support Vectors are critical to the decision boundary.”  
✅ “Maximize the margin to minimize misclassification.”  
✅ “Linear vs Non-linear separation — use the right kernel.”

---

### 🔹 Quick MCQs (Practice)

1. **What is the main goal of SVM?**  
   a) Minimize the distance between points  
   b) Maximize the margin between classes ✅  
   c) Minimize the number of support vectors  

2. **What does the kernel trick in SVM allow?**  
   a) To map data to a higher-dimensional space for non-linear separation ✅  
   b) To separate data linearly without a margin  
   c) To speed up training  

3. **What happens if \(C\) is too large in SVM?**  
   a) Too many support vectors  
   b) Higher margin but more misclassification  
   c) Overfitting (tight margin, few misclassifications) ✅  

---



---

# 📚 Machine Learning Exam Notes

## Chapter 6: Overfitting vs Underfitting

### 🔹 Introduction  
Overfitting and underfitting are two key concepts in machine learning that describe how well a model generalizes to new data. Balancing these two is crucial for building a model that performs well on unseen data.

---

### 🔹 Overfitting

**Definition:**  
Overfitting occurs when a model is too complex and captures the **noise** or **random fluctuations** in the training data, instead of generalizing to the underlying trend.

- **Symptoms of Overfitting:**
  - High accuracy on the training data.
  - Low accuracy on the test data.
  
- **Causes of Overfitting:**
  - Too many features relative to the number of training samples.
  - A very complex model (e.g., a deep decision tree or a very high-degree polynomial).
  
**Example:**  
A decision tree that perfectly classifies all training data but fails on new data is overfitting.

---

### 🔹 Underfitting

**Definition:**  
Underfitting occurs when a model is too simple to capture the underlying trend in the data, leading to poor performance on both the training and test data.

- **Symptoms of Underfitting:**
  - Low accuracy on both training and test data.
  
- **Causes of Underfitting:**
  - Too simple a model (e.g., a linear model for a non-linear problem).
  - Insufficient training (e.g., not enough iterations or too few features).

**Example:**  
A linear regression model applied to data with a non-linear relationship between variables will underfit.

---

### 🔹 Bias-Variance Tradeoff

- **Bias:** The error introduced by assuming a simplified model. High bias leads to underfitting.
- **Variance:** The error introduced by a model's sensitivity to fluctuations in the training data. High variance leads to overfitting.

The goal is to find the right balance between bias and variance:
- **High Bias** → Underfitting
- **High Variance** → Overfitting

---

### 🔹 Regularization to Prevent Overfitting

**Regularization** is a technique to prevent overfitting by penalizing large coefficients in the model. The two most common types of regularization are:

1. **L1 Regularization (Lasso):**  
   Adds a penalty proportional to the absolute value of the coefficients. It can lead to sparse models (some coefficients become zero).

   Regularized loss function:  
   $$
   L_{\text{L1}} = \text{Loss} + \lambda \sum |w_i|
   $$

2. **L2 Regularization (Ridge):**  
   Adds a penalty proportional to the square of the coefficients, preventing excessively large values.

   Regularized loss function:  
   $$
   L_{\text{L2}} = \text{Loss} + \lambda \sum w_i^2
   $$


---

### 🔹 Model Complexity

- **Simple Models** (e.g., linear regression): Tend to **underfit**.
- **Complex Models** (e.g., deep neural networks): Tend to **overfit** unless regularized.

The goal is to find the **right model complexity** that generalizes well to new data.

---

### 🔹 Techniques to Prevent Overfitting

1. **Cross-Validation**:  
   Helps assess model performance on different subsets of the data to detect overfitting early.
   
2. **Early Stopping**:  
   Stop training as soon as the model starts to overfit (in gradient-based models like neural networks).

3. **Pruning** (for Decision Trees):  
   Remove branches of the tree that have little predictive power to reduce complexity.

4. **Dropout (for Neural Networks):  
   Randomly set a fraction of input units to zero during training to prevent co-adaptation of hidden units.

---

### 🔹 Advantages & Disadvantages

**Advantages:**  
- Understanding overfitting and underfitting helps optimize model performance.
- Regularization methods can improve generalization and control model complexity.

**Disadvantages:**  
- Finding the right balance between bias and variance can be challenging.
- Complex models might still overfit if not regularized properly.

---

### 🔹 Short Tricks to Remember  
✅ “Overfitting: Too much complexity.”  
✅ “Underfitting: Not enough complexity.”  
✅ “Balance bias and variance for the best model.”

---

### 🔹 Quick MCQs (Practice)

1. **What happens when a model is overfitting?**  
   a) It performs poorly on both training and test data.  
   b) It performs well on training data but poorly on test data. ✅  
   c) It performs well on test data but poorly on training data.  

2. **What is a common method to prevent overfitting in decision trees?**  
   a) Increase tree depth  
   b) Pruning ✅  
   c) Increase the number of features  

3. **In the bias-variance tradeoff, what happens when the model complexity increases?**  
   a) Bias increases  
   b) Variance increases ✅  
   c) Both bias and variance decrease  


---

# 📚 Machine Learning Exam Notes

## Chapter 7: Neural Networks (Perceptron)

### 🔹 Introduction  
A **perceptron** is the simplest form of a neural network— a single neuron model—that can perform **binary classification** on linearly separable data. It forms the building block of more complex neural networks.

---

### 🔹 Key Concepts  
- **Inputs ($x_i$)**: Features of the data point.  
- **Weights ($w_i$)**: Importance assigned to each feature.  
- **Bias ($b$)**: Adjusts the decision boundary.  
- **Activation Function**: A step function in the basic perceptron, producing an output of 0 or 1.


---

### 🔹 Mathematical Model & Formulas  

1. **Weighted Sum (Net Input):**  
   $$
   z = \sum_{i=1}^{n} w_i x_i + b
   $$

2. **Activation (Step) Function:**  
   $$
   \hat{y} = 
   \begin{cases}
     1 & \text{if } z \ge 0 \\
     0 & \text{if } z < 0
   \end{cases}
   $$

3. **Perceptron Learning Rule (Weight Update):**  
   $$
   w_i \leftarrow w_i + \eta (y - \hat{y}) x_i
   $$  
   $$
   b \leftarrow b + \eta (y - \hat{y})
   $$  
   Where:  
   - $\eta$ = learning rate  
   - $y$ = true label  
   - $\hat{y}$ = predicted label


---

### 🔹 Example: AND Gate  
Train a perceptron to learn the logical AND function:

| $x_1$ | $x_2$ | AND ($y$) |
|:-----:|:-----:|:---------:|
| 0     | 0     | 0         |
| 0     | 1     | 0         |
| 1     | 0     | 0         |
| 1     | 1     | 1         |

- Initialize $w_1$, $w_2$, $b$ to small random values.  
- Update weights using the rule until convergence.  
- Final decision boundary separates the single positive (1,1) from others.


---

### 🔹 Important Diagram (Imagine)
```
 Inputs x1 ──┐
            ├─> [ Σ(w·x) + b ] ──> Activation ──> Output ŷ
 Inputs x2 ──┘
```
➔ A single neuron computing a weighted sum and threshold.

---

### 🔹 Advantages & Disadvantages

**Advantages:**  
- Simple and fast to train.  
- Foundation for deeper neural networks.

**Disadvantages:**  
- Can only solve linearly separable problems.  
- Step activation yields no probability score or gradient, limiting learning techniques.

---

### 🔹 Short Tricks to Remember  
✅ “Perceptron = one neuron classifier.”  
✅ “Weight update nudges boundary towards correct side.”  
✅ “Only linear separability—AND, OR, but not XOR.”

---

### 🔹 Quick MCQs (Practice)

1. **What activation function does the basic perceptron use?**  
   a) Sigmoid  
   b) Step Function ✅  
   c) ReLU  

2. **Which problem can a single perceptron NOT solve?**  
   a) AND  
   b) OR  
   c) XOR ✅  

3. **In the perceptron learning rule, if the prediction $\hat{y}$ is correct, what happens to the weights?**  
   a) They increase by $\eta x_i$  
   b) They decrease by $\eta x_i$  
   c) They remain unchanged ✅



# 📚 Machine Learning Exam Notes

## Chapter 8: K-Fold Cross Validation

### 🔹 Introduction  
Cross validation is a robust technique to **assess model performance** on unseen data. **K-Fold Cross Validation** splits the dataset into \(K\) equal parts (“folds”), ensuring each data point is used for both training and validation.

---

### 🔹 How It Works  

1. **Split** the data into $K$ equal folds.  
2. **Iterate** $K$ times:  
   - In each iteration, use $K-1$ folds to **train** the model.  
   - Use the **remaining** 1 fold to **validate** the model.  
3. **Average** the performance metrics (e.g., accuracy, MSE) across all $K$ runs.

This gives a more reliable estimate of how the model generalizes.


---

### 🔹 Example

Suppose you have 100 samples and choose $K=5$.  
- Fold sizes: 20 samples each.  
- Iteration 1: Train on folds 2–5 (80 samples), test on fold 1 (20 samples).  
- Iteration 2: Train on folds 1, 3–5, test on fold 2.  
- …  
- Iteration 5: Train on folds 1–4, test on fold 5.  

You might record accuracies: 88%, 90%, 87%, 89%, 91%.  
**Average accuracy** = $(88 + 90 + 87 + 89 + 91)/5 = 89\%$.

---

### 🔹 Important Diagram (Imagine)
```
[FOLD 1] [FOLD 2] [FOLD 3] [FOLD 4] [FOLD 5]
   ↘ Train on 2–5 → Validate on 1
   ↘ Train on 1,3–5 → Validate on 2
   ↘ ... 
   ↘ Train on 1–4 → Validate on 5
```
➔ Each fold gets to be the test set exactly once.

---

### 🔹 Advantages & Disadvantages

**Advantages:**  
- **Reduces bias** from a single train/test split.  
- **Uses all data** for training and validation.  
- Provides a **stable estimate** of model performance.

**Disadvantages:**  
- **Computationally expensive**, especially with large \(K\) or heavy models.  
- **May leak information** if pre-processing (e.g., normalization) isn’t done within each fold.

---

### 🔹 Short Tricks to Remember  
✅ “Rotate the test fold!”  
✅ “More folds → less bias, more variance (and compute).”  
✅ “Do pre-processing inside each fold to avoid leaks.”

---

### 🔹 Quick MCQs (Practice)

1. **In 10-Fold Cross Validation on 100 samples, how many samples are in each test fold?**  
   a) 5  
   b) 10 ✅  
   c) 20  

2. **What is the main benefit of using K-Fold CV over a single train/test split?**  
   a) Faster training  
   b) Reduced bias and variance in performance estimate ✅  
   c) Simpler to implement  

3. **Which mistake can cause data leakage during K-Fold CV?**  
   a) Shuffling data before splitting  
   b) Performing normalization on the entire dataset before splitting ✅  
   c) Averaging metrics across folds  


---

# 📚 Machine Learning Exam Notes

## Chapter 9: Important ML Formulas

### 🔹 Introduction  
Machine Learning relies heavily on mathematical formulas to **measure error**, **quantify impurity**, and **regularize models**. This chapter collects the **key formulas** you need to master.

---

### 🔹 Key Formulas

1. **Mean Squared Error (MSE)**  
   Measures average squared difference between actual and predicted values.  
   $$
   \text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
   $$

2. **Root Mean Squared Error (RMSE)**  
   Square root of MSE, brings error to same units as output.  
   $$
   \text{RMSE} = \sqrt{\text{MSE}} = \sqrt{ \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 }
   $$

3. **Mean Absolute Error (MAE)**  
   Average absolute difference: less sensitive to large errors than MSE.  
   $$
   \text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|
   $$

4. **Entropy** (Decision Trees)  
   Impurity measure using probabilities and logs.  
   $$
   H(S) = -\sum_{i=1}^{c} p_i \log_2 p_i
   $$

5. **Gini Impurity** (Decision Trees)  
   Alternative impurity:  
   $$
   G(S) = 1 - \sum_{i=1}^{c} p_i^2
   $$

6. **Information Gain**  
   Reduction in entropy after a split on attribute $A$:  
   $$
   IG(S, A) = H(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|}\,H(S_v)
   $$

7. **Bayes’ Theorem** (Naïve Bayes)  
   Posterior probability formula:  
   $$
   P(C|X) = \frac{P(X|C)\,P(C)}{P(X)}
   $$

8. **Linear SVM Margin**  
   Margin width for hyperplane $w \cdot x + b = 0$:  
   $$
   \text{Margin} = \frac{2}{\lVert w \rVert}
   $$

9. **Regularization Penalties**  
   - **L2 (Ridge):**  
     $$
     L_{\text{ridge}} = \text{Loss} + \lambda \sum_{i} w_i^2
     $$  
   - **L1 (Lasso):**  
     $$
     L_{\text{lasso}} = \text{Loss} + \lambda \sum_{i} |w_i|
     $$

10. **Principal Component Analysis (PCA)**  
    Compute covariance matrix $ \Sigma $ and eigen-decompose:  
    $$
    \Sigma = \frac{1}{n-1} X^\top X,\quad \Sigma v = \lambda v
    $$  
    Principal components are top eigenvectors $v$.


---

### 🔹 Example Calculation

**Compute MSE** for actual $\{3, 5, 2\}$ and predicted $\{2, 5, 4\}$:  
$$
\text{MSE} = \frac{(3-2)^2 + (5-5)^2 + (2-4)^2}{3}
= \frac{1 + 0 + 4}{3} = \frac{5}{3} \approx 1.67
$$


---

### 🔹 Important Diagram (Imagine)
```
                ┌────────────────────────────────┐
                │    Key ML Formulas Cheat-sheet │
                └────────────────────────────────┘
      MSE → squares → average
      MAE → absolutes → average
      Entropy → logs → impurity
      ...
```

---

### 🔹 Short Tricks to Remember  
- “Square errors → MSE, Root → RMSE.”  
- “Absolute errors → MAE for robustness.”  
- “Entropy: chaos measure; Gini: probability-based impurity.”  
- “Penalty λ shrinks weights in regularization.”

---

### 🔹 Quick MCQs (Practice)

1. **Which metric gives error in the same units as the target?**  
   a) MSE  
   b) RMSE ✅  
   c) MAE  

2. **Entropy is zero when:**  
   a) All samples are in one class ✅  
   b) Classes are equally mixed  
   c) No samples  

3. **L1 regularization adds a penalty of:**  
   a) Sum of squared weights  
   b) Sum of absolute weights ✅  
   c) Sum of errors  

4. **Information Gain measures:**  
   a) Increase in entropy after split  
   b) Decrease in entropy after split ✅  
   c) Total entropy  

---


---

# 📚 Machine Learning Exam Notes

## Chapter 10: PCA and LDA

### 🔹 Introduction  
**PCA (Principal Component Analysis)** and **LDA (Linear Discriminant Analysis)** are both **dimensionality reduction** techniques, but they serve different goals:

- **PCA** is an **unsupervised** method focused on capturing the directions of maximum **variance** in the data.
- **LDA** is a **supervised** method focused on finding directions that maximize **class separability**.

---

### 🔹 Principal Component Analysis (PCA)

**Objective:** Reduce dimensionality by projecting data onto a lower-dimensional space defined by the top principal components (directions of highest variance).

1. **Standardize** the data (zero mean, unit variance).
2. Compute the **covariance matrix**:
   $$
   \Sigma = \frac{1}{n-1} X^\top X
   $$
3. **Eigen-decompose** the covariance matrix:
   $$
   \Sigma v = \lambda v
   $$
   - $v$: eigenvector (principal component)  
   - $\lambda$: eigenvalue (variance explained)
4. **Select** top $k$ eigenvectors to form the projection matrix.
5. **Project** original data:
   $$
   Z = X V_k
   $$
   Where $V_k$ is matrix of top $k$ eigenvectors.


---

### 🔹 Linear Discriminant Analysis (LDA)

**Objective:** Reduce dimensionality by projecting data onto directions that maximize the **between-class variance** and minimize the **within-class variance**.

1. Compute **within-class scatter matrix** $S_W$:
   $$
   S_W = \sum_{c=1}^{C} \sum_{x \in D_c} (x - \mu_c)(x - \mu_c)^\top
   $$

2. Compute **between-class scatter matrix** $S_B$:
   $$
   S_B = \sum_{c=1}^{C} N_c (\mu_c - \mu)(\mu_c - \mu)^\top
   $$

3. Solve the **generalized eigenvalue problem**:
   $$
   S_W^{-1} S_B v = \lambda v
   $$

4. **Select** eigenvectors corresponding to the top eigenvalues for projection.


---

### 🔹 Example

**Dataset:** Two classes (A and B) in 3D space.

- **PCA:** Finds directions where data (both classes) vary the most, regardless of labels.
- **LDA:** Finds direction that best separates A from B.

After PCA:
```
[3D data] → PC1, PC2 projections (max variance axes)
```
After LDA:
```
[3D data] → LD1 projection (max class separation)
```

---

### 🔹 Advantages & Disadvantages

**PCA:**  
- **Advantages:**  
  - Unsupervised, no class labels needed.  
  - Captures most variance in fewer dimensions.  
- **Disadvantages:**  
  - May not separate classes well (ignores labels).  

**LDA:**  
- **Advantages:**  
  - Optimizes for class separability.  
  - Useful for classification tasks.  
- **Disadvantages:**  
  - Requires class labels.  
  - May overfit if classes have very few samples.

---

### 🔹 Short Tricks to Remember  
✅ **PCA = “Find variation axes.”**  
✅ **LDA = “Find separation axes.”**  
✅ **PCA unsupervised, LDA supervised.**

---

### 🔹 Quick MCQs (Practice)

1. **PCA chooses components that:**  
   a) Maximize class separation  
   b) Maximize variance ✅  
   c) Minimize variance  

2. **LDA requires:**  
   a) No labels  
   b) Class labels ✅  
   c) Features to be uncorrelated  

3. **Which scatter matrix does LDA maximize?**  
   a) Within-class scatter  
   b) Between-class scatter ✅  
   c) Covariance matrix  

---


---

# 📚 Machine Learning Exam Notes

## Chapter 11: Ensemble Techniques

### 🔹 Introduction  
Ensemble methods combine multiple “weak” learners to produce a stronger overall model. By aggregating the predictions of several models, ensembles reduce variance (bagging), bias (boosting), or both (stacking).

---

### 🔹 Key Concepts  
- **Weak Learner:** A model slightly better than random guessing (e.g., a shallow decision tree).  
- **Ensemble:** A group of models whose outputs are combined.  
- **Aggregation Methods:**  
  - **Voting** (classification)  
  - **Averaging** (regression)  
  - **Stacking** (meta-model learns to combine base models)

---

### 🔹 Types of Ensemble Methods & Formulas

1. **Bagging (Bootstrap Aggregating)**  
   - **Process:** Train each model on a random bootstrap sample (with replacement) of the dataset.  
   - **Prediction (classification):**  
     $$
     \hat{y} = \text{majority\_vote}\bigl(\hat{y}_1, \hat{y}_2, \dots, \hat{y}_m\bigr)
     $$  
   - **Example:** Random Forest (ensemble of decision trees).


2. **Boosting**  
   - **Process:** Sequentially train models, each focusing on the errors of the previous.  
   - **AdaBoost Update Weight:**  
     $$
     w_i \leftarrow w_i \times \exp\bigl(\alpha_t \cdot \mathbb{I}(y_i \neq \hat{y}_i)\bigr)
     $$  
     Where $\alpha_t$ is the model’s weight based on its error.  
   - **Example:** AdaBoost, Gradient Boosting, XGBoost.


3. **Stacking**  
   - **Process:** Train several base learners on the full dataset; then train a “meta-learner” on their predictions to learn optimal combinations.  
   - **Meta-Prediction:**  
     $$
     \hat{y} = g\bigl(\hat{y}_1, \hat{y}_2, \dots, \hat{y}_m\bigr)
     $$  
     Where $g$ is the meta-model.


---

### 🔹 Example: Random Forest Classification

- **Data:** Predict if a customer will churn based on features like tenure, usage, support calls.  
- **Steps:**  
  1. Build 100 decision trees on different bootstrapped samples.  
  2. Each tree votes “Churn” or “No Churn.”  
  3. Final prediction = majority vote.

Random Forest reduces overfitting of single trees and handles nonlinearities.

---

### 🔹 Important Diagram (Imagine)
```
   Data ─┬─> Tree 1 ─┐
         ├─> Tree 2 ─┤
         ├─> ...     ├─> Majority Vote → Final Prediction
         └─> Tree m ─┘
```
➔ Many trees vote together.

---

### 🔹 Advantages & Disadvantages

**Advantages:**  
- **Bagging:** Lowers variance, robust to overfitting.  
- **Boosting:** Lowers bias, often achieves high accuracy.  
- **Stacking:** Can capture complex relationships between models.

**Disadvantages:**  
- Increased **computational cost** (many models).  
- Harder to **interpret** compared to single models.  
- Overfitting can still occur in boosting if not regularized.

---

### 🔹 Short Tricks to Remember  
✅ “Bagging = Bootstrap + Aggregation → Lower variance.”  
✅ “Boosting = Sequential focus on errors → Lower bias.”  
✅ “Stacking = Meta-learner → Learn to combine.”

---

### 🔹 Quick MCQs (Practice)

1. **Which ensemble method reduces variance by training on bootstrapped samples?**  
   a) Boosting  
   b) Bagging ✅  
   c) Stacking  

2. **In boosting, each new learner is trained to:**  
   a) Ignore previous errors  
   b) Correct the errors of the previous model ✅  
   c) Use a different dataset  

3. **Stacking uses a meta-learner to:**  
   a) Generate bootstrapped samples  
   b) Combine base learner predictions ✅  
   c) Prune decision trees  

---


---

# 📚 Machine Learning Exam Notes

## Chapter 12: New Advancements in ML

### 🔹 Introduction  
Machine Learning is a rapidly evolving field. Here are some of the **latest advancements** you should know:

1. **Deep Learning Architectures**  
2. **Transfer Learning**  
3. **AutoML**  
4. **Reinforcement Learning Breakthroughs**  
5. **Explainable AI (XAI)**  
6. **Federated Learning**  
7. **Graph Neural Networks (GNNs)**

---

### 🔹 1. Deep Learning Architectures

- **Convolutional Neural Networks (CNNs):** Excellent for image data; use convolution and pooling layers.  
- **Recurrent Neural Networks (RNNs) & LSTMs:** Handle sequential data like text and time series.  
- **Transformers:** State-of-the-art for language tasks (e.g., BERT, GPT); rely on self-attention mechanism.

**Key Formula (Backpropagation Update):**  
$$
w \leftarrow w - \eta \frac{\partial L}{\partial w}
$$  
Where $L$ is the loss (e.g., cross-entropy) and $\eta$ is the learning rate.


---

### 🔹 2. Transfer Learning

- **Concept:** Use a pre-trained model on a large dataset, then fine-tune on your target task.  
- **Examples:**  
  - **ImageNet** pre-trained CNNs (ResNet, VGG) for new vision tasks.  
  - **BERT**, **GPT** for NLP tasks.

---

### 🔹 3. AutoML

- **Objective:** Automate the end-to-end process of model selection, feature engineering, and hyperparameter tuning.  
- **Tools:** Google’s AutoML, AutoKeras, TPOT.  
- **Benefit:** Democratizes ML, reduces manual effort.

---

### 🔹 4. Reinforcement Learning (RL) Breakthroughs

- **Deep Q-Networks (DQN):** Combined Q-learning with deep neural networks for Atari games.  
- **AlphaZero:** Self-play algorithm mastering Chess, Go, and Shogi without human data.  
- **Policy Gradients & Actor-Critic Methods:** Continuous action spaces (e.g., PPO, A3C).

---

### 🔹 5. Explainable AI (XAI)

- **Purpose:** Make “black-box” models interpretable.  
- **Techniques:**  
  - **LIME:** Local surrogate models to explain individual predictions.  
  - **SHAP:** Shapley values from cooperative game theory to assign feature importance.

---

### 🔹 6. Federated Learning

- **Concept:** Train models across decentralized devices without sharing raw data (privacy-preserving).  
- **Use Case:** Mobile keyboard prediction, health data analytics.

---

### 🔹 7. Graph Neural Networks (GNNs)

- **Objective:** Learn from graph-structured data (social networks, molecules).  
- **Basic Update Rule:**  
  $$
  h_v^{(k+1)} = \sigma \Bigl( \sum_{u \in \mathcal{N}(v)} W^{(k)} h_u^{(k)} + b^{(k)}\Bigr)
  $$  
  Where $h_v$ is node embedding and $\mathcal{N}(v)$ are neighbors.


---

### 🔹 Advantages & Disadvantages

**Advantages:**  
- Cutting-edge performance across vision, language, and sequential tasks.  
- Transfer learning and AutoML accelerate development.  
- XAI and federated learning address real-world concerns (interpretability, privacy).

**Disadvantages:**  
- High computational cost and resource requirements.  
- Complexity increases risk of overfitting and deployment challenges.  
- XAI methods may oversimplify explanations.

---

### 🔹 Short Tricks to Remember  
✅ “CNNs for images, RNNs for sequences, Transformers for everything!”  
✅ “Transfer = reuse knowledge.”  
✅ “AutoML = ML on autopilot.”  
✅ “XAI = trust through transparency.”  
✅ “Federated = train without data leaving.”  
✅ “GNNs = ML on graphs.”

---

### 🔹 Quick MCQs (Practice)

1. **Which architecture uses self-attention for language tasks?**  
   a) RNN  
   b) Transformer ✅  
   c) CNN  

2. **Federated Learning primarily addresses which concern?**  
   a) Model accuracy  
   b) Data privacy ✅  
   c) Overfitting  

3. **SHAP is used for:**  
   a) Dimensionality reduction  
   b) Model interpretability ✅  
   c) Hyperparameter tuning  

4. **Graph Neural Networks operate on:**  
   a) Grid data  
   b) Sequential data  
   c) Graph-structured data ✅  

---



