## How to Draw a Network Diagram

Designing a network diagram like the one shown involves systematic steps. Here’s a step-by-step process for creating the diagram and deciding what to fill first:

---

### **Step 1: List Project Activities and Dependencies**

1. **Create a Work Breakdown Structure (WBS):**
    
    - Break the project into activities (tasks) with unique IDs (e.g., A, B, C).
    - Identify the duration of each activity.
    - Note the dependencies (which activities must precede others).
2. **Identify Lags:**
    
    - Specify any lags or delays between dependent activities.

---

### **Step 2: Create Nodes for Activities**

Each activity is represented as a box (node) with the following fields:

- **Early Start (ES):** The earliest time an activity can start.
- **Early Finish (EF):** ES + Duration.
- **Late Start (LS):** The latest time an activity can start without delaying the project.
- **Late Finish (LF):** The latest time an activity can finish without delaying the project.
- **Slack (SL):** The difference between LS and ES or LF and EF (LS - ES = LF - EF).
- **Duration:** Time required to complete the activity.

---

### **Step 3: Determine the Sequence of Filling the Diagram**

**You must calculate the Early Start (ES), Early Finish (EF), Late Start (LS), and Late Finish (LF) in a specific order.**

1. **Forward Pass:**
    
    - Start from the first activity and calculate **ES** and **EF** for all activities in sequence.
    - Use the formula:
        - **EF = ES + Duration**
        - The **ES** of a dependent activity is the largest **EF** of its predecessor(s) + any lag.
    
    Example:
    
    - For Activity A:
        - ES = 0 (start of the project).
        - EF = ES + Duration = 0 + 5 = 5.
    - For Activity B (dependent on A with Lag 3):
        - ES = EF of A + Lag = 5 + 3 = 8.
2. **Backward Pass:**
    
    - Start from the last activity and calculate **LF** and **LS** for all activities in reverse.
    - Use the formula:
        - **LS = LF - Duration**
        - The **LF** of a predecessor activity is the smallest **LS** of its successor(s) - any lag.
    
    Example:
    
    - For Activity F:
        - LF = Project’s deadline = 20.
        - LS = LF - Duration = 20 - 20 = 0.
    - For Activity A:
        - LF = Smallest LS of successors (Activity F or Activity B).
3. **Calculate Slack:**
    
    - For each activity, compute the slack (SL) using:
        - **SL = LS - ES** or **SL = LF - EF**
    - Activities with **SL = 0** are on the **Critical Path**.

---

### **Step 4: Draw the Diagram**

1. **Create Nodes:** Draw one box for each activity and include the ES, EF, LS, LF, SL, and Duration fields.
2. **Connect Dependencies:**
    - Use solid arrows for immediate dependencies.
    - Use dashed arrows for lags (include the lag value next to the dashed arrow).
3. **Highlight the Critical Path:**
    - Mark activities with **SL = 0** as part of the critical path.

---

### **Step 5: Verify**

1. Check that:
    - The project’s final activity has EF = LF (no delay).
    - All dependencies and lags are accounted for.
2. Ensure that the critical path is accurate.

---

### **Example Order to Fill:**

1. Calculate **ES** and **EF** for all activities using a forward pass.
2. Calculate **LF** and **LS** for all activities using a backward pass.
3. Compute the **Slack** for each activity.
4. Draw the diagram with the calculated values.

Would you like to try designing a simple example with my assistance?


----

## How to Read Network Diagram
![](../images/Pasted%20image%2020250201201356.png)

This is a **network diagram** commonly used in project management to represent the scheduling of activities, dependencies, and durations in a project. Below is an explanation of the elements in this diagram:

### **Key Components:**

1. **Nodes/Activities (Boxes):**
    
    - Each box represents an activity in the project.
    - The details inside the boxes include:
        - **ES**: Early Start (earliest time the activity can begin).
        - **EF**: Early Finish (earliest time the activity can finish).
        - **LS**: Late Start (latest time the activity can start without delaying the project).
        - **LF**: Late Finish (latest time the activity can finish without delaying the project).
        - **SL**: Slack (time that the activity can be delayed without affecting the project's end date).
        - **Duration**: Time required to complete the activity.
2. **Arrows (Dependencies):**
    
    - Arrows indicate dependencies between activities.
    - Solid arrows represent direct dependencies where one activity cannot start until another is completed.
    - Dashed arrows represent lags or delays between activities.
3. **Lags:**
    
    - Lags are the delays (in days or time units) between dependent activities, as shown next to the dashed arrows (e.g., Lag 2, Lag 3, Lag 4).
4. **Critical Path:**
    
    - The **critical path** is the sequence of activities that determine the minimum duration of the project.
    - Activities with zero slack (SL = 0) lie on the critical path, meaning they cannot be delayed without delaying the entire project.
5. **Legend:**
    
    - Provides a reference for interpreting the elements in the diagram.

---

### **Flow of Activities:**

1. **Activity A (Design system):**
    
    - Duration: 5 units
    - ES: 0, EF: 5, LS: 0, LF: 5, SL: 0 (critical path)
2. **Activity B (Order hardware):**
    
    - Duration: 4 units
    - Depends on Activity A with a lag of 3 units.
3. **Activity C (Install hardware):**
    
    - Duration: 10 units
    - Depends on Activity B with a lag of 4 units.
4. **Activity D (Install software):**
    
    - Duration: 16 units
    - Depends on Activity C.
5. **Activity E (Test system):**
    
    - Duration: 18 units
    - Depends on Activity D with a lag of 2 units.
6. **Activity F (System documentation):**
    
    - Duration: 20 units
    - Depends on both Activity A and Activity E.

---

### **Understanding the Flow:**

- The project starts with **Design system (Activity A)**.
- Parallel activities (e.g., ordering hardware) may start after certain dependencies are fulfilled.
- The project concludes with **System documentation (Activity F)** after completing testing.

---

### **Critical Path and Slack:**

- Activities with a slack (SL) of 0 form the critical path.
- Any delay in these activities directly affects the project's completion time.

Would you like me to analyze the critical path further or clarify any specific part?