![Pasted image 20241217105935.png](../../images/Pasted%20image%2020241217105935.png)

1. Configure [[Link Layer Discovery Protocol (LLDP)]]

- R-GW / ISP
```
int g0/1
no sh
commit
lldp enable
commit
```

```
lldp run
int <>
lldp transmit
lldp receive
```
- Verification
```
sh lldp
sh lldpneighbor int <>
sh lldpstatistics int <>
sh lldpstatistic detail
```
1. Configure R-GW to be the [[Network Time Protocol (NTP)]] master . Configure both R1,R2 and R3 to sync their time with R-GW
- R-GW
```
feature ntp

ntp master 3
ntp source loopback0
ntp logging
```

- R1,R2,R3
```
ntp server 142.71.4.4
ntp source loopback0
```

- Verification
```
sh clock detail
sh ntp status
sh run ntp
sh ntp association
```

Reference :
- [Cisco ](https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus5500/sw/system_management/7x/b_5500_System_Mgmt_Config_7x/configuring_ntp.pdf)

1. Send [[Syslog]] Information to PRTG
2. Configure [[Simple Network Management Protocol version 3 (SNMPv3)]] on R-GW
```
snmp-server group group1 v3 auth access lmnop

```


- Verification 
```
sh snmp group
sh snmp user [username]
sh snmp engineID
```