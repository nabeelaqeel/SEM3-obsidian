# TOPIC 

![](../images/Pasted%20image%2020250209203934.png)

1. entity & architecture (body free marks) – difference between in testbench and in design (entity) Or difference between in testbench and in design (architecture) port in entity / type of data in entity / give entity then translate to
2. combinational circuit – behaviour design style 
	1. use loop, if-else, case, when-else
3. testbench (read) – combinational (5 methods to design dataset arithmetic / table lookup / test vector) & sequential
4. latch / FF/ Generic Latch / FF (multi-latch / multi-FF) memorize equation
5. Analyse the circuit (modify the code to tally to what is wanted)
6. FSM (state diagram)
7. Subprogram (give any sequential circuit) use function or procedure to design 
8. variable vs signal – last lecture (from source code) where and when u use variable and signal

# NOTES

## Q2

Loop
```vhdl
for i in 1 to 3 loop
	if x(i) = '1' then 
		tmp := tmp + 1;
	end if;
end loop;
```
When else
```vhdl
y <= "10" when x = "10" else 
	 "11" when x = "11" else
	 "00";
```
With select when
```vhdl
with s select 
	y <= "00" when "00",
	     "01" when "10",
	     "11" when others;
```
For generate
```vhdl
label : for i in 1 to 3 generate
	-- statement
end generate;
```
Case
```vhdl
process(a,b,s)
begin
	case s is 
		when '0' => 
			c <= a;
		when '1' =>
			c <= b;
	end case;
end process;
```

## Q4

## Q6

```vhdl
architecture behavior of q8 is 

    type state is (a,b,c,d);
    signal Mealy_state : state;
```
## Q7

### Function
```vhdl
function nand(signal a , b : in std_logic) return std_logic is
begin
	return (a nand b);
end;
```

### Procedure
```vhdl
procedure nand(signal a , b : in std_logic ; c : out std_logic) is
begin
	c <= (a nand b);
end;
```

## Q8

### Variable
- can only be declared under `process`
- represented the desired behavior , not structure of the circuit

```
process(x)
	variable tmp : integer;
begin
	tmp := 0;
end 
```
### Signal
- 

---

# CHATGPT SUMMARY

### **1. Entity & Architecture in Design vs. Testbench**

#### **Difference Between Entity in Design and Testbench**

- **Design Entity:** Defines the interface (ports) of the actual hardware component.
- **Testbench Entity:** Typically **has no ports** because it is used for simulation only.

##### **Example of Entity in Design**

```vhdl
entity AND_Gate is
    port (
        A : in std_logic;
        B : in std_logic;
        Y : out std_logic
    );
end AND_Gate;
```

##### **Example of Entity in Testbench**

```vhdl
entity AND_Gate_TB is
end AND_Gate_TB;
```

💡 Notice that the testbench **does not** have ports because it generates stimulus internally.

#### **Difference Between Architecture in Design and Testbench**

- **Design Architecture:** Describes the actual functionality of the hardware.
- **Testbench Architecture:** Provides test stimulus and captures output.

##### **Example of Architecture in Design**

```vhdl
architecture Behavioral of AND_Gate is
begin
    Y <= A and B;
end Behavioral;
```

##### **Example of Architecture in Testbench**

```vhdl
architecture Test of AND_Gate_TB is
    signal A_TB, B_TB, Y_TB : std_logic;
begin
    -- Instantiate the design
    UUT: entity work.AND_Gate port map (A_TB, B_TB, Y_TB);
    
    -- Stimulus process
    process
    begin
        A_TB <= '0'; B_TB <= '0'; wait for 10 ns;
        A_TB <= '0'; B_TB <= '1'; wait for 10 ns;
        A_TB <= '1'; B_TB <= '0'; wait for 10 ns;
        A_TB <= '1'; B_TB <= '1'; wait for 10 ns;
        wait;
    end process;
end Test;
```

---

### **2. Combinational Circuit – Behavioral Design Style**

In **Behavioral VHDL**, we use:

- **Loops (`for`, `while`)**
- **Conditional statements (`if-else`, `case`, `when-else`)**

#### **Example: Using `if-else` (Multiplexer)**

```vhdl
architecture Behavioral of MUX2to1 is
begin
    process (A, B, Sel)
    begin
        if Sel = '0' then
            Y <= A;
        else
            Y <= B;
        end if;
    end process;
end Behavioral;
```

#### **Example: Using `case` (4-to-1 MUX)**

```vhdl
architecture Behavioral of MUX4to1 is
begin
    process (A, B, C, D, Sel)
    begin
        case Sel is
            when "00" => Y <= A;
            when "01" => Y <= B;
            when "10" => Y <= C;
            when "11" => Y <= D;
            when others => Y <= '0';
        end case;
    end process;
end Behavioral;
```

#### **4-bit Priority Encoder**

A priority encoder assigns an output based on the highest-priority active input.

```vhdl
architecture Behavioral of Priority_Encoder is
begin
    process (input)
    variable i : integer;
    begin
        output <= "00";  -- Default value
        for i in 3 downto 0 loop
            if input(i) = '1' then
                output <= std_logic_vector(to_unsigned(i, 2)); -- Encode position
                exit;  -- Stop after finding the highest-priority input
            end if;
        end loop;
    end process;
end Behavioral;
```

---

### **Example: Using `while` Loop in a Comparator**

```vhdl
architecture Behavioral of Comparator is
begin
    process (A, B)
    variable i : integer := 0;
    variable equal : boolean := true;
    begin
        while (i < A'length and equal) loop
            if A(i) /= B(i) then
                equal := false;
            end if;
            i := i + 1;
        end loop;
        
        if equal then
            Y <= '1'; -- A = B
        else
            Y <= '0'; -- A ≠ B
        end if;
    end process;
end Behavioral;
```


---


#### **2-to-1 MUX using `when-else`**

```vhdl
architecture Behavioral of MUX2to1 is
begin
    Y <= A when Sel = '0' else
         B; -- Default when Sel = '1'
end Behavioral;
```

---

#### **4-to-1 MUX using `when-else`**

```vhdl
architecture Behavioral of MUX4to1 is
begin
    Y <= A when Sel = "00" else
         B when Sel = "01" else
         C when Sel = "10" else
         D when Sel = "11" else
         '0'; -- Default case
end Behavioral;
```



---

### **3. Testbench for Combinational Circuits**

#### **Five Methods for Test Dataset**

1. **Arithmetic:** Generate inputs using mathematical operations.
2. **Table Lookup:** Store predefined test cases in an array.
3. **Test Vector:** Read test patterns from a file.
4. **Random Generation:** Use random values for testing.
5. **Exhaustive Testing:** Generate all possible inputs.

---

### **4. Latch vs Flip-Flop (FF)**

|Feature|Latch|Flip-Flop (FF)|
|---|---|---|
|**Triggering**|Level-sensitive|Edge-sensitive|
|**Clock Needed?**|Not always|Yes|
|**Used for?**|Fast data storage|Synchronization|

#### **Generic Latch Equation**

Q=D (for transparent latch when enable is 1)Q = D \text{ (for transparent latch when enable is 1)}

#### **D Flip-Flop Equation**

Q+=DQ^+ = D

---

### **5. Analyze and Modify the Circuit Code**

Given a circuit, analyze the errors and fix them. Example:

```vhdl
architecture Error of Circuit is
begin
    process (clk)
    begin
        if rising_edge(clk) then
            Q <= D; -- Missing else condition
        end if;
    end process;
end Error;
```

✅ **Correction:** Add a reset condition.

```vhdl
architecture Fixed of Circuit is
begin
    process (clk, reset)
    begin
        if reset = '1' then
            Q <= '0';
        elsif rising_edge(clk) then
            Q <= D;
        end if;
    end process;
end Fixed;
```

---

### **6. FSM (Finite State Machine)**

#### **Example of FSM (State Diagram)**


##### **FSM Code for a Simple Traffic Light**

```vhdl
type state_type is (Red, Green, Yellow);
signal current_state, next_state : state_type;

process (clk, reset)
begin
    if reset = '1' then
        current_state <= Red;
    elsif rising_edge(clk) then
        current_state <= next_state;
    end if;
end process;

process (current_state)
begin
    case current_state is
        when Red =>
            next_state <= Green;
        when Green =>
            next_state <= Yellow;
        when Yellow =>
            next_state <= Red;
        when others =>
            next_state <= Red;
    end case;
end process;
```

---

### **7. Subprograms (Function & Procedure)**

#### **Function Example:**

```vhdl
function Add (A, B : integer) return integer is
begin
    return A + B;
end function;
```

#### **Procedure Example:**

```vhdl
procedure Set_Latch(signal Q : out std_logic; signal D : in std_logic) is
begin
    Q <= D;
end procedure;
```

---

### **8. Variable vs. Signal**

|Feature|Signal|Variable|
|---|---|---|
|**Scope**|Process & architecture|Process only|
|**Update Timing**|After process completes|Immediately|

#### **Example of `signal` (Synchronous)**

```vhdl
signal x : integer;
process(clk)
begin
    if rising_edge(clk) then
        x <= x + 1; -- Updates after process ends
    end if;
end process;
```

#### **Example of `variable` (Immediate Update)**

```vhdl
process
    variable x : integer := 0;
begin
    x := x + 1; -- Updates immediately
end process;
```

---

### **Final Thoughts**

- **Use `if-else`, `case`, `when-else`** for combinational circuits.
- **Use FSM for state-based systems.**
- **Use procedures/functions for modular design.**
- **Understand the difference between `signal` and `variable` to avoid timing issues.**

Let me know if you want any part explained in more detail! 🚀
