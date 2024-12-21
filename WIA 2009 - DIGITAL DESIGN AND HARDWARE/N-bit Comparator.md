![[../images/Pasted image 20241116164420.png|Pasted image 20241116164420.png]]

```vhdl
entity COMPARE8 is
   port(
      A, B: in STD_LOGIC_VECTOR(7 downto 0);
      CMP_IN: in STD_LOGIC_VECTOR(1 downto 0);
      CMP_OUT: out STD_LOGIC_VECTOR(1 downto 0));
end COMPARE8;
```

| CMP_IN              | CMP_OUT                             |
| ------------------- | ----------------------------------- |
| 00                  | 00 IF A=B<br>10 IF A>B<br>01 IF A<B |
| 10                  | 10 independently of A and B         |
| 01                  | 01 independently of A and B         |
| 11(invalid options) | --                                  |
|                     |                                     |
![[../images/Pasted image 20241116164655.png|Pasted image 20241116164655.png]]
```vhdl
entity BIT_COMPARE is
    port(A, B, X_IN, Y_IN: in STD_LOGIC;
         X_OUT, Y_OUT: out STD_LOGIC);
end BIT_COMPARE;
```

| X_IN & Y_IN         | X_OUT & Y_OUT                                               |
| ------------------- | ----------------------------------------------------------- |
| 00                  | 00 IF A=B<br>10 IF A='1' and B='0'<br>01 IF A='0' and B='1' |
| 10                  | 10 independently of A and B                                 |
| 01                  | 01 independently of A and B                                 |
| 11(invalid options) | --                                                          |
![[../images/Pasted image 20241116165017.png|Pasted image 20241116165017.png]]
```vhdl
architecture STRUCTURE of COMPARE8 is
   component BIT_COMPARE
      port(A, B, X_IN, Y_IN: in STD_LOGIC;
           X_OUT, Y_OUT: out STD_LOGIC);
   end component;

   signal INT_X, INT_Y: STD_LOGIC_VECTOR(7 downto 1);

begin
   C7: BIT_COMPARE port map(A(7), B(7), CMP_IN(1), CMP_IN(0),
                            INT_X(7), INT_Y(7));
   C6: BIT_COMPARE port map(A(6), B(6), INT_X(7), INT_Y(7),
                            INT_X(6), INT_Y(6));
       . . .
   C0: BIT_COMPARE port map(A(0), B(0), INT_X(1), INT_Y(1),
                            CMP_OUT(0), CMP_OUT(1));
end STRUCTURE;
```

![[../images/Pasted image 20241116165147.png|Pasted image 20241116165147.png]]
```vhdl
architecture STRUCTURE of COMPARE8 is
   component BIT_COMPARE
      port(A, B, X_IN, Y_IN: in STD_LOGIC;
           X_OUT, Y_OUT: out STD_LOGIC);
   end component;
   signal INT_X, INT_Y: STD_LOGIC_VECTOR(8 downto 0);

begin
   INT_X(8) <= CMP_IN(1); 
   INT_Y(8) <= CMP_IN(0);

   CASCADE: for I in 7 downto 0 generate
      C: BIT_COMPARE port map(A(I), B(I), INT_X(I+1), INT_Y(I+1),
                            INT_X(I), INT_Y(I));
   end generate;

   CMP_OUT(1) <= INT_X(0); 
   CMP_OUT(0) <= INT_Y(0);
end STRUCTURE;

```

- N-bit Comparator
```vhdl
entity COMPAREN is
   generic(N: positive);  -- N – width of operands
   port(
      A, B: in BIT_VECTOR(N-1 downto 0);
      CMP_IN: in BIT_VECTOR(1 downto 0);
      CMP_OUT: out BIT_VECTOR(1 downto 0));
end COMPAREN;

architecture STRUCTURE of COMPAREN is
   component BIT_COMPARE
      port(A, B, X_IN, Y_IN: in STD_LOGIC;
           X_OUT, Y_OUT: out STD_LOGIC);
   end component;
   signal INT_X, INT_Y: STD_LOGIC_VECTOR(N downto 0);
begin
   INT_X(N) <= CMP_IN(1);  
   INT_Y(N) <= CMP_IN(0);

   CASCADE: for I in N-1 downto 0 generate
      C: BIT_COMPARE port map(A(I), B(I), INT_X(I+1), INT_Y(I+1),
                            INT_X(I), INT_Y(I));
   end generate;

   CMP_OUT(1) <= INT_X(0); 
   CMP_OUT(0) <= INT_Y(0);
end STRUCTURE;
```

- N-bit Comparator - Instantiation
```vhdl
component COMPAREN
   generic(N: positive);  -- N – width of operands
   port(
      A, B: in STD_LOGIC_VECTOR(N downto 0);
      CMP_IN: in STD_LOGIC_VECTOR(1 downto 0);
      CMP_OUT: out STD_LOGIC_VECTOR(1 downto 0));
end component;
………

CMP8: COMPAREN
   generic map(N => 16)
   port map(A => P1,       B => P2,
      CMP_IN => SIG_IN,
      CMP_OUT => SIG_OUT
   );

```