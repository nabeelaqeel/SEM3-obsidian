
## 2 to 4 Decoder
![[../images/Pasted image 20241113110909.png|Pasted image 20241113110909.png]]
![[../images/Pasted image 20241113111309.png|Pasted image 20241113111309.png]]
```vhdl
LIBRARY ieee ;
USE ieee.std_logic_1164.all ;
ENTITY dec2to4 IS

    PORT ( w    : IN    STD_LOGIC_VECTOR(1 DOWNTO 0) ;
           En   : IN    STD_LOGIC ;
            y   : OUT   STD_LOGIC_VECTOR(0 TO 3) ) ;

END dec2to4 ;

ARCHITECTURE Dataflow OF dec2to4 IS

SIGNAL Enw : STD_LOGIC_VECTOR(2 DOWNTO 0) ;
BEGIN
    Enw <= En & w ;
    WITH Enw SELECT
           y <= "1000" WHEN "100",
                "0100" WHEN "101",
                "0010" WHEN "110",
                "0001" WHEN "111",
                "0000" WHEN OTHERS ;
END Dataflow
```

## 4 to 16 decoder
![[../images/Pasted image 20241113111633.png|Pasted image 20241113111633.png]]
![[../images/Pasted image 20241113111711.png|Pasted image 20241113111711.png]]
```vhdl
LIBRARY ieee ;
USE ieee.std_logic_1164.all ;

ENTITY dec4to16 IS
        PORT (w : IN    STD_LOGIC_VECTOR(3 DOWNTO 0) ;
             En : IN    STD_LOGIC ;
              y : OUT   STD_LOGIC_VECTOR(0 TO 15) ) ;
END dec4to16 ;

ARCHITECTURE Structure OF dec4to16 IS  

    COMPONENT dec2to4
        PORT (  w   : IN    STD_LOGIC_VECTOR(1 DOWNTO 0) ;
            En  : IN    STD_LOGIC ;
            y   : OUT   STD_LOGIC_VECTOR(0 TO 3) ) ;
    END COMPONENT ;

    SIGNAL m : STD_LOGIC_VECTOR(0 TO 3) ;

BEGIN

    G1: FOR i IN 0 TO 3 GENERATE
        Dec_ri: dec2to4 PORT MAP ( w(1 DOWNTO 0), m(i),  y(4*i TO 4*i+3)  );
        G2: IF i=3 GENERATE
            Dec_left: dec2to4 PORT MAP ( w(i DOWNTO i-1), En, m ) ;
        END GENERATE ;
    END GENERATE ;

END Structure ;
```
