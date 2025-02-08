# 2019/2020 SEM 1

## Q1
![](../images/Pasted%20image%2020250203142940.png)

To solve the given question:

### Signals Declaration

- `a, b`: `std_logic_vector(3 downto 0)` (4 bits)
- `p, q`: `std_logic_vector(7 downto 0)` (8 bits)

### Assignments

1. `a <= (2 => '1', 1 => '0', 0 => '0', 3 => '1');`
    
    - `a` is assigned specific bits:
        
        ```
        3 => '1'  
        2 => '1'  
        1 => '0'  
        0 => '0'
        ```
        
        Result: `a = 1100`
2. `p <= (7|5|3 => '1', others => '0');`
    
    - `p(7)`, `p(5)`, and `p(3)` are set to `'1'`. All other bits are `'0'`.  
        Result: `p = 10101000`
3. `b <= (others => '0');`
    
    - All bits of `b` are set to `'0'`.  
        Result: `b = 0000`
4. `q <= (6 downto 4 => '0', others => '1');`
    
    - `q(6)`, `q(5)`, and `q(4)` are set to `'0'`. All other bits are set to `'1'`.  
        Result: `q = 10001111`

### Final Values

- **`a` = `1100`**
- **`p` = `10101000`**
- **`b` = `0000`**
- **`q` = `10001111`**

These are the values of the signals after the assignments.


## Q2 
![](../images/Pasted%20image%2020250203143918.png)

Let's carefully re-evaluate each assignment to identify any **invalid** cases.

---

### Signal Assignments

#### 1. **`a <= x"8_2";`**

- **Analysis:**
    - The **`x""`** notation requires a valid hexadecimal number.
    - `8_2` includes an underscore (`_`), which is **not valid** in VHDL hexadecimal literals.
- **Result:** **Invalid assignment.**
    - Reason: The underscore (`_`) is not allowed in hexadecimal literals.

---

#### 2. **`b <= b"01101101";`**

- **Analysis:**
    - The **`b""`** notation is valid for binary literals, and `01101101` is a correct 8-bit binary string.
- **Result:** **Valid assignment.**
    - Final value: `b = 01101101`.

---

#### 3. **`c <= "00" & o"46";`**

- **Analysis:**
    - The concatenation operator (`&`) joins two values:
        - `"00"` is a valid 2-bit binary string.
        - `o"46"` is an octal number. Octal `46` translates to binary:
            - `4` = `100` (3 bits)
            - `6` = `110` (3 bits)
            - Combined: `100110`.
    - Concatenating `"00"` (2 bits) with `100110` (6 bits) results in an 8-bit value.
- **Result:** **Valid assignment.**
    - Final value: `c = 00100110`.

---

#### 4. **`d <= "1101_0011";`**

- **Analysis:**
    - Binary string `"1101_0011"` uses an underscore (`_`) for readability, which is valid in VHDL.
    - The resulting binary value is `11010011`.
- **Result:** **Valid assignment.**
    - Final value: `d = 11010011`.

---

#### 5. **`e <= x"AC";`**

- **Analysis:**
    - The **`x""`** notation is valid for hexadecimal literals, and `AC` is a correct hexadecimal number.
    - Hexadecimal `AC` translates to binary:
        - `A` = `1010` (4 bits)
        - `C` = `1100` (4 bits)
        - Combined: `10101100`.
- **Result:** **Valid assignment.**
    - Final value: `e = 10101100`.

---

### Summary of Validity

- **`a`**: **Invalid** (Underscore in hexadecimal is not allowed).
- **`b`**: **Valid** (`01101101`).
- **`c`**: **Valid** (`00100110`).
- **`d`**: **Valid** (`11010011`).
- **`e`**: **Valid** (`10101100`).

### Final Values

- **`a`**: **Invalid**
- **`b`**: `01101101`
- **`c`**: `00100110`
- **`d`**: `11010011`
- **`e`**: `10101100`


## Q3
a

## Q4
![](../images/Pasted%20image%2020250203145445.png)

```vhdl
entity mux is 
port(
	a,b,s: in std_logic;
	c : out std_logic
);
end entity;
```

```vhdl
architecture case_bod of mux is 

begin 
	process(a,b,s)
	begin
		case s is 
			when '0' => 
				c <= a;
			when '1' =>
				c <= b;
		end case;
	end process;
end;
```


## Q5
![](../images/Pasted%20image%2020250203150519.png)
```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity q5 is 
port(
	a,b,c : in std_logic;
	x : out std_logic
);
end entity;

architecture conditional of q5 is 
	signal abc : std_logic_vector(2 downto 0);

	begin 
	
	abc <= a & b & c;

	 x <= 	'1' when (abc = "000" or abc = "001" or abc = "011" or abc = "111") else
			'0' when (abc = "010" or abc = "100") else 
			'X';


end architecture;
```

## Q6
![](../images/Pasted%20image%2020250203153210.png)

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity priority is 
port (
    w : in std_logic_vector(3 downto 0);
    y : out std_logic_vector(1 downto 0);
    z : out std_logic
);
end entity;

architecture Behavior of priority is
    begin 
	process(w)
	begin

        IF w(3) = '1' then 
	        y <= "11" ;
        ELSIF w(2) = '1' then
	         y <= "10";
        ELSIF w(1) = '1' then 
	        y <= "01";
        ELSE 
	        y <= "00";
        end if ;
    
        IF w = "0000" then 
	        z <= '0';
        ELSE 
	        z <= '1';
        end if;
	
	end process;
end ;
 ```

## Q7
![](../images/Pasted%20image%2020250203154619.png)

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity jkff is 
port(
	j,k,pre_bar,clr_bar ,clk : in std_logic;
	q : out std_logic
);
end jkff;

architecture behavioral of jkff is 

	signal q_sig : std_logic;
begin 
process(j,k,pre_bar,clr_bar)

begin

	if pre_bar = '0' then 
		q_sig <= '1';
	elsif clr_bar = '1' then 
		q_sig <= '0';
	elsif rising_edge(clk) then 
		q_sig <= (j and (not q_sig)) or ((not k) and (not q_sig));
	end if;

end process;
q <= q_sig;

end architecture;
```

## Q8
![](../images/Pasted%20image%2020250203162051.png)
```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity q8 is 
port(
    clk,rst, x: in std_logic;
    y : out std_logic
);
end entity ;

architecture behavior of q8 is 

    type state is (a,b,c,d);
    signal Mealy_state : state;
    
begin
process(clk,rst)

begin

    IF(rst = '1') then 
        Mealy_state <= a;

    ELSIF rising_edge(clk) then 
        case Mealy_state is 
            when a =>
                IF x = '0' then 
                    Mealy_state <= a;
                else 
                    Mealy_state <= b;
                end if;

            when b => 
                IF x = '0' then 
                    Mealy_state <= a;
                else 
                    Mealy_state <= c;
                end if;

            when c =>
                IF x = '0' then 
                    Mealy_state <= d;
                else
                    Mealy_state <= c;
                end if;
            
            when d =>
                IF x = '0' then 
                    Mealy_state <= a;
                else 
                    Mealy_state <= b;
                end if;

        end case;

    end if;

end process;
y <= '1' when (Mealy_state = d and x = '1') else '0'; 

end architecture;
```

## Q9
![](../images/Pasted%20image%2020250203162108.png)
```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity q9 is 
port(
    rst, clk ,v: in std_logic;
    gray : out std_logic_vector(2 downto 0)
);
end entity;

architecture behavior of q9 is 

type state is (a,b,c,d,e,f,g,h);
signal moore_state : state;

begin
process(clk,rst)
begin

    if rst = '1' then
        moore_state <= a;
    elsif rising_edge(clk) then

        case moore_state is

            when a => 
                IF v = '0' then 
                    moore_state <= b;
                else 
                    moore_state <= a;
                end if;

            when b => 
            IF v = '0' then 
                moore_state <= c;
            else 
                moore_state <= a;
            end if;

            when c => 
                IF v = '0' then 
                    moore_state <= d;
                else 
                    moore_state <= b;
                end if;

            when d => 
            IF v = '0' then 
                moore_state <= e;
            else 
                moore_state <= c;
            end if;

            when e => 
                IF v = '0' then 
                    moore_state <= f;
                else 
                    moore_state <= d;
                end if;

            when f => 
            IF v = '0' then 
                moore_state <= g;
            else 
                moore_state <= e;
            end if;

            when g => 
                IF v = '0' then 
                    moore_state <= h;
                else 
                    moore_state <= f;
                end if;

            when h => 
            IF v = '0' then 
                moore_state <= h;
            else 
                moore_state <= g;
            end if;
        
        end case;

    end if;

end process;

process(moore_state)
begin
    case moore_state is 
        
            when a => gray <= "000";
            when b => gray <= "001";
            when c => gray <= "011";
            when d => gray <= "010";
            when e => gray <= "110";
            when f => gray <= "111";
            when g => gray <= "101";
            when h => gray <= "100";


    end case;
end process;

            
end architecture;
```

---

# 2018/2019 SEM2

## Q1
![](../images/Pasted%20image%2020250203191022.png)

### **Answers**

#### **a) Differentiate between `case` and `if` statements in VHDL**

|**Aspect**|**`case` Statement**|**`if` Statement**|
|---|---|---|
|**Usage**|Used for checking specific, discrete values (e.g., enumerations, constants).|Used for evaluating boolean expressions and conditions.|
|**Conditions**|Requires all possible cases to be covered explicitly, or a `when others` clause is mandatory.|Does not require all conditions to be explicitly covered; default behavior can be left out.|
|**Evaluation**|Evaluates the input value and matches it against the cases.|Evaluates conditions sequentially until one is true.|
|**Complexity**|Simpler and cleaner for discrete comparisons.|Flexible for more complex conditions and ranges.|
|**Scope of Usage**|Cannot evaluate ranges, logical operators, or relational conditions directly.|Can evaluate ranges, relational operators (`=`, `<`, etc.), and logical expressions.|

**Example of `case` Statement**:

```vhdl
case sel is
    when "00" => y <= a;
    when "01" => y <= b;
    when "10" => y <= c;
    when others => y <= d;
end case;
```

**Example of `if` Statement**:

```vhdl
if sel = "00" then
    y <= a;
elsif sel = "01" then
    y <= b;
elsif sel = "10" then
    y <= c;
else
    y <= d;
end if;
```

---

#### **b) Differentiate between `variable` and `signal` in the process**

|**Aspect**|**Variable**|**Signal**|
|---|---|---|
|**Declaration**|Declared inside a `process`, `function`, or `procedure`.|Declared in the architecture and can be global or local.|
|**Update Behavior**|Updated immediately within the process (sequential execution).|Updated only at the end of the process (event-driven execution).|
|**Scope**|Local to the process, function, or procedure.|Global to the architecture or specific to the process.|
|**Usage**|Used for temporary computations or intermediate results.|Used for communication between processes or with external ports.|
|**Synthesis**|Not directly synthesizable (only indirectly affects hardware).|Synthesizable as physical hardware components (e.g., wires, flip-flops).|

**Example of `variable`**:

```vhdl
process(clk)
    variable temp : integer;
begin
    temp := a + b;  -- Updated immediately
    y <= temp + c;  -- Uses updated value of temp
end process;
```

**Example of `signal`**:

```vhdl
signal temp : integer;
process(clk)
begin
    temp <= a + b;  -- Updated at the end of the process
    y <= temp + c;  -- Uses old value of temp within the process
end process;
```

---

### Summary

- Use `case` for discrete value comparisons and `if` for more complex conditions.
- Use `variable` for intermediate values within a process and `signal` for communicating values across processes or between the design and external entities.

## Q2
![](../images/Pasted%20image%2020250203191040.png)

## Q3
![](../images/Pasted%20image%2020250203191100.png)

```vhdl
architecture behavior of priority is
begin

y <= "00" when w = "0001" else
	"01" when (w = "0010" or w = "0011") else
	"10" when (w = "0100" or w = "0101" or w = "0110" or w = "0111") else
	"11";

z <= '0' when w = "0000" else '1';

end architecture;
```

```vhdl
architecture behavior of priority is 
begin

process(w)
begin

	if (w = "0001") then 
		y <= "00";
	elsif (w = "0010" or w = "0011") then
		y <= "01";
	elsif (w = "0100" or w = "0101" or w = "0110" or w = "0111" ) then
		y <= "10";
	else
		y <= "11";
	end if;

	if w = "0000" then 
		z <= '0';
	else 
		z <= '1';
	end if;

end process;
end architecture;
```

## Q4
![](../images/Pasted%20image%2020250203214212.png)

### **Errors Identified**

#### **1. Incorrect Bit String Notation**

- **Problem**: The bit string `'11'` is written incorrectly.
    - In VHDL, single quotes (`'`) are used for **single-bit** values, not multi-bit strings.
    - `'11'` implies a single bit, but it's a two-bit value, which is invalid syntax.
- **Fix**: Use double quotes (`"`) for multi-bit values:
    
    ```vhdl
    "11"
    ```
    

---

#### **2. Missing or Mismatched Port Map Connection**

- **Problem**: The **number of signals in the `PORT MAP` statement** might not match the declared ports in the `shiftr` entity.
    - The `shiftr` component should have a declaration in the form:
        
        ```vhdl
        entity shiftr is
            generic (K : integer); -- Generic parameter
            port (input1 : std_logic_vector(1 downto 0); 
                  clk : std_logic; 
                  w : std_logic; 
                  q : std_logic);
        end shiftr;
        ```
        
        If `shiftr`'s ports do not match the provided signals in the `PORT MAP`, there will be an error.
- **Fix**: Ensure that:
    - The ports in the `PORT MAP` statement match the number, order, and data type of ports in the entity declaration for `shiftr`.

---

### **Corrected Code**

```vhdl
control: shiftr GENERIC MAP (K => 3)
         PORT MAP ("11", Clock, w, Q);
```

---

### **Summary**

- **Error 1**: Incorrect bit string notation (`'11'`). Fixed by using double quotes (`"11"`).
- **Error 2**: Potential mismatch in the `PORT MAP` statement. Fixed by verifying the `shiftr` entity's port declaration to ensure proper matching.

This corrected code will now compile successfully if the `shiftr` component is correctly declared.


## Q5
![](../images/Pasted%20image%2020250203214554.png)

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity q5 is 
port(
	x , rst ,clk : in std_logic;
	y : out std_logic;
);
end entity;

architecture behavior of q5 is 

	type q5_state is (a,b,c,d);
	signal state : q5_state;

begin

process(clk,rst)
begin

	if rst = '1' then
		state <= a;
	elsif rising_edge(clk) then

		case state is 

			when a => 
				if x = '0' then
					state <= a;
				else
					state <= b;
				end if;

			when b =>
				if x = '0' then
					state <= a;
				else 
					state <= c;
				end if;

			when c => 
				if x = '0' then 
					state <= d;
				else 
					state <= c;
				end if;

			when d =>
				if x = '0' then
					state <= a;
				else 
					state <= b;
				end if;
		end case;
	end if;
end process;

	y <= '1' when (state = d and x = '1') else '0';

end architecture;
				
```

![](../images/Pasted%20image%2020250203215902.png)

Here is the VHDL code to implement a **2-input NAND gate** using both a **function** and a **procedure**.

---

### **a) Using `function` Syntax**

In VHDL, a **function** returns a single value and is typically used for calculations or operations.

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity nand_function is
    port (
        a, b : in std_logic;  -- 2-inputs
        y    : out std_logic  -- Output
    );
end entity;

architecture behavior of nand_function is
    -- Function to compute the NAND operation
    function nand_gate(x1, x2 : std_logic) return std_logic is
    begin
        return not (x1 and x2);  -- NAND operation
    end function;
begin
    -- Use the function to assign the output
    y <= nand_gate(a, b);
end architecture;
```

---

### **b) Using `procedure` Syntax**

In VHDL, a **procedure** can return multiple values or manipulate signals via `in`, `out`, or `inout` parameters.

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity nand_procedure is
    port (
        a, b : in std_logic;  -- 2-inputs
        y    : out std_logic  -- Output
    );
end entity;

architecture behavior of nand_procedure is
    -- Procedure to compute the NAND operation
    procedure nand_gate(x1, x2 : in std_logic; result : out std_logic) is
    begin
        result := not (x1 and x2);  -- NAND operation
    end procedure;
begin
    process(a, b)
        variable temp : std_logic;  -- Temporary variable
    begin
        nand_gate(a, b, temp);  -- Call the procedure with a variable
        y <= temp;             -- Assign the variable to the output signal
    end process;
end architecture;
```

---

### **Key Differences Between `function` and `procedure`**

|**Aspect**|**Function**|**Procedure**|
|---|---|---|
|**Purpose**|Returns a single value.|Can return multiple values or modify signals.|
|**Return Value**|Uses the `return` keyword.|Does not use `return`; uses `out` parameters.|
|**Complexity**|Simpler, used for operations like calculations.|More flexible, used for complex operations.|

---

### **Summary**

- The **function** is used for simpler operations where a single output is needed.
- The **procedure** is more versatile and allows for more flexibility in handling multiple signals.

Both implementations above will produce the correct output for a 2-input NAND gate. Let me know if you need further clarification!

## Q7
![](../images/Pasted%20image%2020250203220541.png)

## Q8
![](../images/Pasted%20image%2020250203220622.png)

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity q8 is
	port(
		rst, clk , v : in std_logic;
		gray : out std_logic_vector(2 downto 0)
);
end entity;

architecture behavior of q8 is 

	type q9_state is (a,b,c,d,e,f,g,h);
	signal state : q9_state;

begin
process(clk,rst)
begin

	if rst = '1' then 
		state <= a;
	elsif rising_edge(clk) then

		case state is 

			when a => 
				if v = '0' then 
					state <= b;
				else 
					state <= a;
				end if;

			when b => 
				if v = '0' then 
					state <= c;
				else 
					state <= a;
				end if; 
				
			when c => 
				if v = '0' then 
					state <= d;
				else 
					state <= b;
				end if; 

			when d => 
				if v = '0' then 
					state <= e;
				else 
					state <= c;
				end if; 
				
			when e => 
				if v = '0' then 
					state <= f;
				else 
					state <= d;
				end if;

			when f => 
				if v = '0' then 
					state <= g;
				else 
					state <= e;
				end if; 
				
			when g => 
				if v = '0' then 
					state <= h;
				else 
					state <= f;
				end if; 

			when h => 
				if v = '0' then 
					state <= h;
				else 
					state <= g;
				end if; 

		end case;
	end if;
end process;



	gray <= "000" when state = a else
			"001" when state = b else
			"011" when state = c else
			"010" when state = d else
			"110" when state = e else
			"111" when state = f else
			"100";

end architecture;

```

---

## 2016/2017 SEM2

## Q1
![](../images/Pasted%20image%2020250208041144.png)
![](../images/Pasted%20image%2020250208123727.png)
![](../images/Pasted%20image%2020250208123740.png)
![](../images/Pasted%20image%2020250208123826.png)
![](../images/Pasted%20image%2020250208123840.png)
![](../images/Pasted%20image%2020250208123852.png)
![](../images/Pasted%20image%2020250208123901.png)

## Q2
![](../images/Pasted%20image%2020250208123915.png)

## Q3
![](../images/Pasted%20image%2020250208123927.png)