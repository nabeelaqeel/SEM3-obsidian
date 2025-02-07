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

| InvNo | InvDate | PatID | PatName | PatAdd | MedID | MedName | Desc | Type | Price |     |
| ----- | ------- | ----- | ------- | ------ | ----- | ------- | ---- | ---- | ----- | --- |

2NF

Invitation

| InvNo | InvDate | PatID | PatName | PatAdd |
| ----- | ------- | ----- | ------- | ------ |
Medication

| MedID | MedName | Desc | Type | Price |
| ----- | ------- | ---- | ---- | ----- |

3NF

Invitation

| InvNo | InvDate | PatID |
| ----- | ------- | ----- |
 Medication
 
| MedID | MedName | Desc | Type | Price |
| ----- | ------- | ---- | ---- | ----- |
 Patient

| PatID | PatName | PatAdd |
| ----- | ------- | ------ |
 
 

## Q5
![](../images/Pasted%20image%2020250207115946.png)
![](../images/Pasted%20image%2020250207120025.png)

### Q5 (a)
![](../images/Pasted%20image%2020250207120042.png)

| Iron            |
| --------------- |
| HomeGym         |
| Microwave Oven  |
| Cordless Drill  |
| Washing Machine |
| Stand Mixer     |
| Dishwasher      |

### Q5 (b)
![](../images/Pasted%20image%2020250207120118.png)
```sql
UPDATE  CUSTOMER 
SET Street = '90A , Jln Kita 2'
WHERE CustNo = 524 ;
```

### Q5 (c)
![](../images/Pasted%20image%2020250207120136.png)
```sql
SELECT CustNo , CustName , (CreditLimit - Balance) AS AvaiCre
FROM CUSTOMER 
WHERE CreditLimit > Balance;
```
### Q5 (d)
![](../images/Pasted%20image%2020250207120202.png)
```sql
SELECT CUSTOMER.CustNo , CUSTOMER.CustName , AGENT.AgentNo , AGENT.FirstName , AGENT.LastName
FROM CUSTOMER 
LEFT JOIN AGENT ON CUSTOMER.AgentNo = AGENT.AgentNo
ORDER BY CustNo;
```
### Q5 (e)
![](../images/Pasted%20image%2020250207120226.png)
![](../images/Pasted%20image%2020250207120237.png)
```sql
SELECT AgentNo , Count(CustNo) AS NoOfCust , ROUND(Avg(Balance),2) AS AverageBal
FROM CUSTOMER
GROUP BY AgentNo
ORDER BY AgentNo ASC; 
```

---

# 2018/2019 SEM1

## Q1
![](../images/Pasted%20image%2020250207120432.png)

## Q2
![](../images/Pasted%20image%2020250207120447.png)

## Q3
![](../images/Pasted%20image%2020250207120512.png)
![](../images/Pasted%20image%2020250207120533.png)

```mermaid
erDiagram
    h[Hotel] {
        string Hotel_ID PK
        string HotelName
        string ResortName
    }
    a[Accomodation] {
        string AccCode PK
        string Catering
        string BedType
    }
    c[Customer]{
	    string Customer_ID PK
	    string PhoneNum 
    }
    r[Reservation]{
	    string ReservationNo PK
	    string Customer_ID FK
	    string Hotel_ID FK
	    string AccCode FK
	    string ReservationDate
    }
    ha[Hotel_Accomodation]{
	    string Hotel_ID FK
	    string AccCode FK
	    float Price 
	    string Month
    }
    

	r o{--|| a : have
	r o{--|| h : have
	c ||--o{ r : make
	h ||--o{ ha : have
	a ||--o{ ha : have

```



## Q4
![](../images/Pasted%20image%2020250207120601.png)
![](../images/Pasted%20image%2020250207120615.png)

primary key : InvoiceNum , ItemNum

Partial Dependency
- CustomerNum --> CustLastName , CustFirstName , Street , City 
- ItemNum --> ItemDesc, Price , QtyShipped

Transitive Dependency 
- City --> Zip , State

3NF
Invoice

| InvoiceNum (PK) | CustNum (FK) | Date |
| --------------- | ------------ | ---- |

Invoice_Item

| InvoiceNum (PK,FK) | ItemNum (PK,FK) | QtyShipped |
| ------------------ | --------------- | ---------- |
Customer

| CustNum (PK) | CustLastName | CustFirstName | Street | City |
| ------------ | ------------ | ------------- | ------ | ---- |

City

| City (PK) | ZIP | State |
| --------- | --- | ----- |

> WHY HAS TO CREATE INVOICE_ITEM ?
> - because Item and Invoice is in many to many relationship

## Q5
![](../images/Pasted%20image%2020250207120644.png)
![](../images/Pasted%20image%2020250207120702.png)
```sql
SELECT * 
FROM EMPLOYEE 
WHERE SALARY BETWEEN 5000 AND 12000 
ORDER BY SALARY ASC;
```

```sql
SELECT *
FROM EMPLOYEE
WHERE DEPARTMENT_ID = 20 AND SALARY > 5000;
```
![](../images/Pasted%20image%2020250207120713.png)
```sql
SELECT JOB_ID , COUNT(EMPLOYEE_ID) AS TOTAL_EMPLOYEE
FROM EMPLOYEE
GROUP BY JOB_ID;
```

```sql
SELECT EMPLOYEE.LAST_NAME , DEPARTMENTS.DEPARTMENT_NAME
FROM EMPLOYEE
LEFT JOIN DEPARTMENT
ON DEPARTMENT.DEPARTMENT_ID = EMPLOYEE.DEPARTMENT_ID;
```

```sql
SELECT EMPLOYEE_ID , LAST_NAME , SALARY 
FROM EMPLOYEE
WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEE );
```
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

