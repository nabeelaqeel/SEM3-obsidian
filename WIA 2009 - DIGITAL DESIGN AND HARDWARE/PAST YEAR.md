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