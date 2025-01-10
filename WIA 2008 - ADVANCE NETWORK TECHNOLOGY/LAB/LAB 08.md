![Pasted image 20241217105935.png](../../images/Pasted%20image%2020241217105935.png)

1. Configure [[Link Layer Discovery Protocol (LLDP)]]

- R-GW / ISP

```
lldp run
int g0/2
lldp transmit
lldp receive

int g0/1
lldp transmit
lld receive
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
ntp master 3
ntp source g0/1
ntp logging
```

- R2
```
ntp server 142.71.3.30
ntp source g4/0
```

- R1,R3

```
ntp server 142.71.3.30
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

2. Send [[Syslog]] Information to PRTG

```
logging host 142.71.3.34
logging trap informational
logging source lo 0
logging on

```

3. Configure [[Simple Network Management Protocol version 3 (SNMPv3)]] on R-GW ,R1

- R-GW
```
int g0/0
ip add 142.71.3.33 255.255.255.252 
 
```

```
ip ospf 1 area 60
int g0/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO


ipv6 unicast-routing
int g0/1
ipv6 ospf 1 area 60
ipv6 ospf authentication ipsec spi 263 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
default-information originate always
```

- R-GW 
```
snmp-server group SNMP-GROUP v3 priv
snmp-server user SNMP-USER SNMP-GROUP v3 auth md5 CISCO12345 priv aes 128 CISCO12345
snmp-server host 142.71.3.34 version 3 priv host-user
```

- R2
```
snmp-server group SNMP-GROUP v3 priv
snmp-server user SNMP-USER SNMP-GROUP v3 auth md5 CISCO12345 priv aes 128 CISCO12345
snmp-server host 142.71.3.34 version 3 priv host-user
```

- Verification 
```
sh snmp group
sh snmp user SNMP-USER
sh snmp engineID
```

Reference :
- [Cisco](https://www.cisco.com/c/en/us/support/docs/ip/simple-network-management-protocol-snmp/7282-12.html)
