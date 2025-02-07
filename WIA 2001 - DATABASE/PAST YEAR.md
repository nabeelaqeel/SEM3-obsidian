# 2019/2020 SEM1

## Q1
![](../images/Pasted%20image%2020250207120306.png)

## Q2
![](../images/Pasted%20image%2020250207120320.png)


## Q3
![](../images/Pasted%20image%2020250207115849.png)
Business rules
1. `Product` are made up of many `components`
2. Each `component` can be supplied by one or more `supplier`
3. a `supplier` can exist without providing `component` ; hmm
4. a `component` does not have to be associated with a `supplier` : optional 
5. a `component` does not have to be associated with a `product` . Not all component are used in product : optional
6. a `product` cannot exist without a `component`  : mandatory

```mermaid

erDiagram
    p[Product] {
        string productID PK
        string productName
        int quantityOnHand
    }
    s[Supplier] {
        string supplierID PK
    }
    c[Component]{
	    string compenentID PK
	    string supplierID FK
	    string productID FK
	    string name
	    string description
	    
    }
    p |o--|{ c : "made up" 
    c |o--o{ s : suppply
```


## Q4
![](../images/Pasted%20image%2020250207115918.png)
Primary Key (Given)
- InvNo
- MedID

Partial Dependencies 
- InvNo --> InvDate , PatID 
- MedID --> MedName , Desc, Type, Price

Transitive Dependencies
- PatID --> PatName,PatAdd

1NF

Invitation

| InvNo | InvDate | PatID |
| ----- | ------- | ----- |



## Q5
![](../images/Pasted%20image%2020250207115946.png)
![](../images/Pasted%20image%2020250207120025.png)

### Q5 (a)
![](../images/Pasted%20image%2020250207120042.png)

### Q5 (b)
![](../images/Pasted%20image%2020250207120118.png)

### Q5 (c)
![](../images/Pasted%20image%2020250207120136.png)

### Q5 (d)
![](../images/Pasted%20image%2020250207120202.png)

### Q5 (e)
![](../images/Pasted%20image%2020250207120226.png)
![](../images/Pasted%20image%2020250207120237.png)


---

# 2018/2019 SEM1

## Q1
![](../images/Pasted%20image%2020250207120432.png)

## Q2
![](../images/Pasted%20image%2020250207120447.png)

## Q3
![](../images/Pasted%20image%2020250207120512.png)
![](../images/Pasted%20image%2020250207120533.png)


## Q4
![](../images/Pasted%20image%2020250207120601.png)
![](../images/Pasted%20image%2020250207120615.png)

## Q5
![](../images/Pasted%20image%2020250207120644.png)
![](../images/Pasted%20image%2020250207120702.png)
![](../images/Pasted%20image%2020250207120713.png)

# 2016/2017

## Q1
![](../images/Pasted%20image%2020250207121204.png)

## Q2
![](../images/Pasted%20image%2020250207121231.png)

## Q3
![](../images/Pasted%20image%2020250207121253.png)

## Q4
![](../images/Pasted%20image%2020250207121313.png)
![](../images/Pasted%20image%2020250207121322.png)
![](../images/Pasted%20image%2020250207121333.png)

## Q5
![](../images/Pasted%20image%2020250207121353.png)
![](../images/Pasted%20image%2020250207121406.png)
![](../images/Pasted%20image%2020250207121420.png)

