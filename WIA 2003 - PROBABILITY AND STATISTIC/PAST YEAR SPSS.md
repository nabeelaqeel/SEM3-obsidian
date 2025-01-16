# 2023 SEM 1

## Q8 (a) - 2m
### Observations and Conclusion:

1. **Observations**:
    
    - **None (No Fertilizer)**: The weights of the plants are spread across a wider range (30g to 70g) with a peak frequency around 40-50g. The distribution appears more dispersed and skewed, indicating inconsistent plant growth without fertilizer.
    - **Biological Fertilizer**: The weights of the plants are more concentrated between 40g and 60g, with a peak around 50g. This suggests a moderate and relatively uniform growth pattern with biological fertilizer.
    - **Chemical Fertilizer**: The weights are distributed between 50g and 70g, with a sharp peak around 60g. This suggests that chemical fertilizer leads to the highest and most consistent growth among the three treatments.
2. **Conclusion**:
    
    - Based on the histogram, **chemical fertilizer** appears to be the most effective, resulting in higher plant weights and more consistent growth compared to biological fertilizer or no fertilizer.


## Q8 (b) - 1m

### ANOVA Results Discussion:

1. **Null Hypothesis (H₀)**: The mean weights of orchid plants for all groups (fertilizers) are equal.
    
2. **Alternative Hypothesis (H₁)**: At least one group's mean weight is different.
    
3. **Analysis**:
    
    - The **F-statistic** is 3.743, and the **p-value** (Sig.) is 0.028.
    - Since the **p-value (0.028)** is less than the significance level **α = 0.05**, we reject the null hypothesis.
4. **Conclusion**:
    
    - There is sufficient evidence to conclude that at least one fertilizer has a statistically significant effect on the weight of orchid plants. Further post-hoc testing may be needed to identify which specific fertilizers differ.

## Q8 (c) - 2m

### Post-hoc Tukey HSD Test Results:

1. **Key Observations**:
    
    - The comparison between **None** and **Biological** fertilizers shows a mean difference of -2.433 with a p-value (Sig.) of 0.486. Since the p-value is greater than 0.05, the difference is not statistically significant.
    - The comparison between **None** and **Chemical** fertilizers shows a mean difference of -5.767 with a p-value of 0.021. Since the p-value is less than 0.05, this difference is statistically significant, meaning the Chemical fertilizer leads to significantly higher weights compared to None.
    - The comparison between **Biological** and **Chemical** fertilizers shows a mean difference of -3.333 with a p-value of 0.262. Since the p-value is greater than 0.05, the difference is not statistically significant.
2. **Conclusion**:
    
    - **Chemical fertilizer** is significantly better than **no fertilizer** in improving the weight of orchid plants.
    - There is no significant difference between the effects of **Biological** and **Chemical** fertilizers or between **Biological** fertilizer and no fertilizer.


## Q9 - 5m

### Suggested Non-Parametric Test

A suitable non-parametric test for comparing outcomes between two independent groups is the **Mann-Whitney U test** (also known as the Wilcoxon rank-sum test).

---

### Justification for Using a Non-Parametric Test

1. **No Assumption of Normality**: The Mann-Whitney U test does not require the data to be normally distributed, making it ideal when the assumption of normality for parametric tests (like the independent t-test) cannot be met.
    
2. **Small Sample Sizes**: It is particularly useful when the sample sizes of the two groups are small, which makes assessing normality unreliable.
    
3. **Ordinal Data or Non-Continuous Variables**: The test can be used with ordinal data or when the measurements are ranks rather than continuous numerical values.
    
4. **Unequal Variances**: When the variances of the two groups are not equal, the Mann-Whitney U test is a robust alternative to parametric tests, which assume equal variances.
    

By ranking all data points across the groups and comparing the ranks, this test evaluates whether one group tends to have larger or smaller values compared to the other.

# 2019/2020 SEM 1

## Q7

### (a) Explain Paired t-test (1 mark):

A paired t-test is used to compare the means of two related groups to determine if there is a significant difference. It is applied when the same subjects are measured under two conditions, such as before and after treatment.

### (b) Define Descriptive and Inferential Statistics (2 marks):

1. **Descriptive Statistics**: Summarizes and organizes data using measures like mean, median, and standard deviation.
2. **Inferential Statistics**: Makes predictions or conclusions about a population based on a sample using techniques like hypothesis testing and confidence intervals.

###  (c) (i)

In a paired t-test, the **degrees of freedom (df)** represent the number of paired observations minus one. It reflects the number of independent data points used to estimate variability in the data.

### (c) (ii)

The paired t-test gives a p-value  < 0.000, which is less than the significance level (α=0.05\alpha = 0.05).

### (c) (iii)

 There is a **statistically significant difference** between the average scores for English and Math.


## Q8

### Q8 (a)

### Answer:

The proportion of variance in the response (Science Test Score, **SCISCORE**) explained by the regression model is given by **R Square (0.051)**.

1. **R Square**:
    
    - R Square = 0.051 = **5.1%**.
    - This means **5.1% of the variance in Science Test Score** is explained by the predictor, **Home Educational Resources Score (HEDRES)**.
2. **Conclusion**:
    
    - The regression model explains a small portion (5.1%) of the variability in the Science Test Scores, indicating a weak relationship between the predictor (HEDRES) and the response (SCISCORE).

### (b) Find the regression equation and predict SCISCORE when HEDRES = 10:

The regression equation is of the form:

$$SCISCORE=β0+β1⋅HEDRES\text{SCISCORE} = \beta_0 + \beta_1 \cdot \text{HEDRES}$$

From the table:

- $β0\beta_0 (Constant) = 523.882$
- $β1\beta_1 (Coefficient for HEDRES) = 22.733$

Substituting into the equation:

$SCISCORE=523.882+22.733⋅HEDRES\text{SCISCORE} = 523.882 + 22.733 \cdot \text{HEDRES}$

$For HEDRES = 10:$

$SCISCORE=523.882+22.733⋅10=523.882+227.33=751.212\text{SCISCORE} = 523.882 + 22.733 \cdot 10 = 523.882 + 227.33 = 751.212$

**Answer**: The predicted SCISCORE when HEDRES = 10 is **751.21**.

---

### (c) How much does SCISCORE change with a one-unit increase in HEDRES?

From the table, the unstandardized coefficient for **HEDRES** is 22.73322.733.  
This means for every 1-unit increase in HEDRES, SCISCORE increases by **22.733**.

**Answer**: SCISCORE increases by **22.73** for every 1-unit increase in HEDRES.


## Q9

### (a) Two examples of negative correlation (2 marks):

1. **Hours of exercise vs. body weight**: As the number of hours spent exercising increases, body weight tends to decrease.
2. **Temperature vs. sales of hot beverages**: As the temperature rises, the sales of hot beverages typically decrease.

---

### (b) Differences between nonparametric and parametric tests (2 marks):

1. **Assumptions**:
    
    - **Parametric tests** assume the data follows a specific distribution (e.g., normal distribution).
    - **Nonparametric tests** make no assumptions about the data's distribution.
2. **Data Type**:
    
    - **Parametric tests** require interval or ratio data.
    - **Nonparametric tests** can handle ordinal or nominal data and are more robust for skewed or small samples.

### (c) In what situations do we use nonparametric tests? (1 mark):

Nonparametric tests are used when:

- The data does **not meet the assumptions** of parametric tests (e.g., not normally distributed or unequal variances).
- The sample size is **small** or the data is **ordinal, nominal, or ranked**.


# 2018/2019

## Q7

### (a) State the null and alternative hypotheses (2 marks):

1. **Null Hypothesis $(H_0)$**:  
    The average grade for Assignment 1 $(\mu)$ is equal to 23.
    
    $$H_0: \mu = 23$$
2. **Alternative Hypothesis $(H_1)$**:  
    The average grade for Assignment 1 $(\mu)$ is not equal to 23.
    
    $$H_1: \mu \neq 23$$

---

### (b) Make a decision regarding the null hypothesis (1 mark):

we rejected the null hypothesis because p < 0.05

(c) since the significant is < 0.0001 , we rejected the null hypothesis. 


## Q8

### (a) State the null and alternative hypotheses (2 marks):

1. **Null Hypothesis (H0H_0)**:  
    There is no significant correlation between Age and Cholesterol levels.
    
    H0:ρ=0
2. **Alternative Hypothesis (H1H_1)**:  
    There is a significant correlation between Age and Cholesterol levels.
    
    H1:ρ≠0

---

### (b) Decision regarding the null hypothesis (3 marks):

From the Pearson correlation table:

- The **correlation coefficient** (r) is 0.882, indicating a strong positive correlation.
- The **p-value (Sig. 2-tailed)** is 0.001, which is less than the significance level (α=0.05).

**Decision**:

- Since p<0.05, we **reject the null hypothesis (H0H_0)**.

**Conclusion**:

- There is a significant positive correlation between Age and Cholesterol levels.

## Q9

### (a) Differences between parametric and nonparametric tests (2 marks):

1. **Parametric tests**:
    
    - Assume data follows a specific distribution (e.g., normal distribution).
    - Require interval or ratio data.
    - Example: t-test, ANOVA.
2. **Nonparametric tests**:
    
    - Do not assume a specific data distribution.
    - Can handle ordinal, nominal, or ranked data.
    - Example: Mann-Whitney U test, Kruskal-Wallis test.

---

### (b) Answer TRUE or FALSE (1 mark each):

**i) The Pearson correlation coefficient (r) measures the degree of association between two variables.**

- **Answer**: TRUE.  
    Pearson’s r quantifies the strength and direction of the linear relationship between two continuous variables.

**ii) The two populations are not identical is the alternative hypothesis in the Mann-Whitney U test.**

- **Answer**: TRUE.  
    The Mann-Whitney U test compares two independent groups and tests whether their distributions are the same.

**iii) The run test is applied for testing the randomness of the samples.**

- **Answer**: TRUE.  
    The run test checks whether a sequence of data points is random.


# 2018 / 2019

## Q3

### (a) State the null (H0H_0) and alternative (H1H_1) hypotheses symbolically (2 marks):

1. **i) Mean annual income of workers is greater than $50,000**:
    
    - Null Hypothesis (H0): μ≤50,000
    - Alternative Hypothesis (H1): μ>50,000
2. **ii) The mean amount of Coke in cans is at least 12oz**:
    
    - Null Hypothesis (H0: μ≥12
	    - Alternative Hypothesis (H1): μ<12

---

### (b) Why is cluster sampling frequently used in practice? (2 marks):

1. **Efficiency**: Cluster sampling is cost-effective and practical, especially for large populations spread across wide geographic areas, as it reduces travel and administrative costs.
2. **Convenience**: It simplifies data collection by dividing the population into clusters and randomly selecting clusters for sampling, making it easier to manage than simple random sampling in certain cases.

### (d)

### Answer:

The **most appropriate measure of center** in this case is the **mode**.

1. **Reason**:
    
    - The data represents a frequency distribution for categorical variables (countries winning the Davis Cup), which are non-numeric.
    - The **mode** identifies the country that won the Davis Cup the most frequently, which provides meaningful information in this context.
2. **Conclusion**:
    
    - The mode is **United States** (frequency = 6), as it is the most frequent winner.
    - Measures like the mean and median are not suitable here because they are designed for numerical data, not categorical data like this.