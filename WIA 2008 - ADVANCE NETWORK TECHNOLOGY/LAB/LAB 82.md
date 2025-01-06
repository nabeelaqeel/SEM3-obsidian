```
crypto isakmp policy 10
encryption aes
hash sha
authentication pre-share
group 2
exit
crypto isakmp key secretkey address ipv6 2001:100:100:39::2/64
crypto ipsec transform-set IPV6-TRANSFORM esp-aes esp-sha-hmac
mode tunnel
exit
crypto map ipv6 IPV6-MAP 10 ipsec-isakmp
set peer 2001:100:100:39::2
set transform-set IPV6-TRANSFORM
match address RGW-IPV6-IPSEC
exit
interface GigabitEthernet1/0
ipv6 enable
ipv6 crypto map IPV6-MAP
exit
ipv6 route 2001:100:100:39::2/64 2001:100:100:84::0
```

- RGW-2
```
conf t
ipv6 access-list RGW2-IPV6-IPSEC
permit ipv6 2001:142:39:12::/64 2001:142:84:11::/64
crypto isakmp policy 10
encryption aes
hash sha
authentication pre-share
group 2
exit
crypto isakmp key secretkey address ipv6 2001:100:100:84::1/64
crypto ipsec transform-set IPV6-TRANSFORM esp-aes esp-sha-hmac
mode tunnel
exit
crypto map ipv6 IPV6-MAP 10 ipsec-isakmp
set peer 2001:100:100:84::1
set transform-set IPV6-TRANSFORM
match address RGW2-IPV6-IPSEC
exit
interface GigabitEthernet2/0
ipv6 crypto map IPV6-MAP
ipv6 enable
exit
ipv6 route 2001:100:100:84::1/64 2001:100:100:39::1
//all the time i accidentally put match address RGW-IPV6-IPSEC instead of match address RGW2-IPV6-IPSEC for RGW2
///////////////////////////////////////
```


















LAB 8

RGW
```
lldp run

RGW
clock set 10:31:00 3 Jan 2025
conf t
ntp master 3
int lo0
ip add 142.84.84.1 255.255.255.255
no shut
end
conf t
router ospf 1
int lo0
ipv6 enable
ip ospf 1 area 60
no shut
end
conf t
router ospf 1
area 60 authentication message-digest
int lo0
ip ospf message-digest-key 1 md5 cisco


R1
ntp server 142.84.84.1

R2
ntp server 142.84.0.25

R3
ntp server 142.84.0.29

```

```
SYSLOG

NETWORK : 142.84.20.0/30
PC IP : 142.84.20.2
RGW LINK TO PC :142.84.20.1
NETWORK : 2001:142:84:20::/64
PC IP : 2001:142:84:20::2
RGW LINK TO PC : 2001:142:84:20::0

logging host <PRTG_IP_Address>
logging trap <severity_level>
logging on

RGW
conf t
int g0/2
ip add 142.84.20.1 255.255.255.252
ipv add 2001:142:84:20::1/64
no shut

logging host 142.84.20.2
logging trap 7
logging on

```

```
SNMP

snmp-server group snmp-v3-group v3 priv
snmp-server user snmp-v3-user snmp-v3-group v3 auth md5 password123 priv aes 128 privatepassword123
snmp-server host 142.84.20.2 version 3 priv host-user


R1
snmp-server group snmp-v3-group v3 priv
snmp-server user snmp-v3-user snmp-v3-group v3 auth md5 password123 priv aes 128 privatepassword123
snmp-server host 142.84.20.2 version 3 priv host-user
```
