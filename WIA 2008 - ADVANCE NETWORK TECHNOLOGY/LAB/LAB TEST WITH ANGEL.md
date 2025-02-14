## VPN 

IPV4

R1
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key MYPASSWORD address 133.62.1.2
crypto ipsec transform-set MYTRANSFORMSET esp-aes esp-sha-hmac
mode tunnel

crypto map CRYPTOMAP 10 ipsec-isakmp
set peer 133.62.1.2
set transform-set MYTRANSFORMSET
match address R2_IPSEC
```

```
ip access-list extended R2_IPSEC
permit ip 133.71.0.0 0.0.255.255 133.62.0.0 0.0.255.255
permit ip 133.62.0.0 0.0.255.255 133.71.0.0 0.0.255.255
```

```
int g2/0
crypto map CRYPTOMAP
crypto isakmp enable
```


IPV6

R1
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key secretkey address ipv6 2001:133:62:1::/127
crypto ipsec transform-set IPV6-TRANSFORM esp-aes esp-sha-hmac
mode tunnel

crypto map ipv6 IPV6-CM 10 ipsec-isakmp
set peer 2001:133:62:1::
set transform-set IPV6-TRANSFORM
match address R2_IPV6

interface g2/0
ipv6 enable
ipv6 crypto map IPV6-CM
```

```
ipv6 access-list R2_IPV6
permit ip 2001:133:71::/48 2001:133:62::/48
permit ip 2001:133:62::/48 2001:133:71::/48
```


---

## BGP

```
router bgp 171
network 101.100.133.0 mask 255.255.255.0 
```

```
router bgp 171

bgp log-neighbor-changes
address-family ipv6
network 2001:101:100:133::/64
```

---

## GRE

```
int tunnel 1
ip add 172.16.1.1 255.255.255.252
tunnel source 133.71.1.5
tunnel destination 133.62.1.2
```

```
ip route 133.62.99.99 255.255.255.255 172.16.1.2
```

---
## TFTP Server

Reference
https://www.websentra.com/tftp-on-windows-10/

---
## Backup IOS

1. backup ios from r1 to tftp

```
copy 
```