[LAB 07](LAB%2007.md)![Pasted image 20241203192538.png](../../images/Pasted%20image%2020241203192538.png)

![Pasted image 20241220101204.png](../../images/Pasted%20image%2020241220101204.png)



1. Reconfigure
- R2
```
int g4/0
ip add 142.71.3.29 255.255.255.252
ipv6 add 2001:142:71:12::1/64
```

```
router ospf 1
network 142.71.3.28 0.0.0.3 area 60
area 60 authentication message-digest


int g4/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO

ipv6 unicast-routing
int g4/0
ipv6 ospf 1 area 60
ipv6 ospf authentication ipsec spi 262 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
```

- R-GW
```
int g4/0
ip add 142.71.3.30 255.255.255.252
ipv6 add 2001:142:71:12::2/64

int g1/0
ip add 100.100.71.1 255.255.255.252
ipv6 add 2001:100:100:71::/127

int lo0
ip add 142.71.4.4 255.255.255.255
ipv6 add 2001:142:71:9::4/128
```

```
router ospf 1
network 142.71.3.28 0.0.0.3 area 60
area 60 authentication message-digest
passive-interface g1/0
default-information originate always


int g4/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO

ipv6 unicast-routing
int g4/0
ipv6 ospf 1 area 60
ipv6 ospf authentication ipsec spi 262 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
passive-interface g1/0
default-information originate always
```

```
router bgp 20
bgp router-id 1.1.1.1
neighbor 100.100.71.2 remote-as 21
network 142.71.0.0 mask 255.255.0.0 
```

```
router bgp 20

bgp log-neighbor-changes
neighbor 2001:100:100:71::1 remote-as 21
address-family ipv6
neighbor 2001:100:100:71::1 activate
network 2001:142:71::/48
```

```
ip route 142.71.0.0 255.255.0.0 null0
ipv6 route 2001:142:71::/48 null0
```
> remove passive interface first 
> remove default-information originate always on R2

1. Shift all ACL from R2 To R-GW
- R2
```
no ip access-list extended INFRASTRUCTURE_R1
no ipv6 access-list INFRASTRUCTURE_R1_IPV6

int g4/0
no ip access-group INFRASTRUCTURE_R1 in
no ipv6 traffic-filter INFRASTRUCTURE_R1_IPV6 in
```
- R-GW
```
no ip access-list extended INFRASTRUCTURE
remark "All external traffic can only access DMZ"
remark Deny router interface for dmz
permit ip host 100.100.62.1 host 100.100.71.1
permit udp any any eq 500
permit esp any any
permit gre host 142.62.3.2 host 142.71.3.22
deny ip any host 142.71.5.1
permit ip any 142.71.5.0 0.0.0.63
permit icmp any any echo-reply
remark Enable Infrastructure ACL on R1
remark Deny special-use address sources
deny ip host 0.0.0.0 any
deny ip 127.0.0.0 0.255.255.255 any
deny ip 192.0.2.0 0.0.0.255 any
deny ip 224.0.0.0 31.255.255.255 any
remark Filter RFC 1918 space
deny ip 10.0.0.0 0.255.255.255 any
deny ip 172.16.0.0 0.15.255.255 any
deny ip 192.168.0.0 0.0.255.255 any
remark Deny your space as source from entering your AS
deny ip 142.71.0.0 0.0.255.255 any
remark Permit BGP
permit tcp host 100.100.71.2 host 100.100.71.1 eq bgp
permit tcp host 100.100.71.2 eq bgp host 100.100.71.1
remark Deny Access to Internal Infrastructure Address
deny ip any 142.71.0.0 0.0.255.255
```

```
int g0/2
ip access-group INFRASTRUCTURE in 
```

```
ipv6 access-list INFRASTRUCTURE_IPV6
remark All external traffic can only access DMZ
remark Deny router interface for dmz
permit udp any any eq 500
permit esp any any
deny ipv6 any 2001:142:71:14::1/128 
permit ipv6 any 2001:142:71:14::/64
permit icmp any any echo-reply
remark _Deny your space as source from entering your AS_
deny ipv6 2001:142:71::/48 any
remark _Permit multiprotocol BGP_
permit tcp host 2001:100:100:71::1 host 2001:100:100:71:: eq bgp
permit tcp host 2001:100:100:71::1 eq bgp host 2001:100:100:71::
remark _Deny access to internal infrastructure addresses_
deny ipv6 any 2001:142:71::/48
```

```
int g0/2
ipv6 traffic-filter INFRASTRUCTURE_IPV6 in
```

2. Change ISP configuration

- Change it 

```
interface GigabitEthernet0/0.30
encapsulation dot1Q 30
ip add 100.100.71.2 255.255.255.252
ipv6 add 2001:100:100:71::1/127

```

```
int f0/11
sw mode acc
sw acc vlan 30
```


3. Configure GRE NET 105 with other team

- R3
```
int tunnel 1
ip add 172.16.1.1 255.255.255.252
tunnel source 142.71.3.22
tunnel destination 142.62.3.2
```

```
ip route 192.168.0.0 255.255.255.128 172.16.1.2
```

```
permit gre host 142.71.3.22 host 142.62.3.2
```

```
ip mtu 1400
ip tcp adjust-mss 1360
```
Reference : [Cisco Community](https://community.cisco.com/t5/networking-knowledge-base/how-to-configure-a-gre-tunnel/ta-p/3131970)
![../../images/Pasted image 20241221234330.png](../../images/Pasted%20image%2020241221234330.png)

5. Create IPSEC VPN between R-GW from VLAN 103 to DMZ
- R-GW
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key MYPASSWORD address 100.100.62.1
crypto ipsec transform-set MYTRANSFORMSET esp-aes esp-sha-hmac
mode tunnel

crypto map CRYPTOMAP 10 ipsec-isakmp
set peer 100.100.62.1
set transform-set MYTRANSFORMSET
match address R-GW_IPSEC
```

```
ip access-list extended R-GW_IPSEC
permit ip 142.71.0.0 0.0.255.255 142.62.0.0 0.0.255.255
permit ip 142.62.0.0 0.0.255.255 142.71.0.0 0.0.255.255
```

```
ip access-list extended R-GW_IPSEC
permit ip 142.71.0.0 0.0.1.255 142.62.5.0 0.0.0.63
permit ip 142.71.5.0 0.0.0.63 142.62.0.0 0.0.1.255
```

```
int g0/2
crypto map CRYPTOMAP
```

```
no ip route 142.62.0.0 255.255.0.0 100.100.62.1
```

```
crypto isakmp enable
```

```
clock set 10:50:00 Feb 3 2025
```

- IPv6
- R-GW
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key secretkey address ipv6 2001:100:100:62::/127
crypto ipsec transform-set IPV6-TRANSFORM esp-aes esp-sha-hmac
mode tunnel

crypto map ipv6 IPV6-CM 10 ipsec-isakmp
set peer 2001:100:100:62::
set transform-set IPV6-TRANSFORM
match address R-GW_IPV6

interface GigabitEthernet0/2
ipv6 enable
ipv6 crypto map IPV6-CM

```

```
ipv6 access-list R-GW_IPV6
permit ip 2001:142:71:3::/64 2001:142:62:112::/64
permit ip 2001:142:71:14::/64 2001:142:62:103::/64
```



Verification 
```
sh crypto isakmp sa
sh crypto ipsec sa int g0/2
sh crypto map
sh crypto session
sh crypto session remote 100.100.62.1 detail
```

> - Make sure the time is consistent across devices

Troubleshoot
- [Cisco Community](https://community.cisco.com/t5/security-knowledge-base/site-to-site-vpn-troubleshooting-tips/ta-p/3111356)
- [Cisco](https://www.cisco.com/c/en/us/support/docs/security/asa-5500-x-series-next-generation-firewalls/81824-common-ipsec-trouble.html)
- 
Reference :
- [Cisco](https://www.cisco.com/c/en/us/support/docs/routers/1700-series-modular-access-routers/71462-rtr-l2l-ipsec-split.html)
- [Cisco Configuring IPSec PDF](https://www.cisco.com/c/en/us/td/docs/routers/interface-module-lorawan/software/configuration/guide/b_lora_scg/iipsec.pdf)
- [Cisco](https://www.cisco.com/en/US/docs/routers/access/800/850/software/configuration/guide/vpngre.html)


## Change NET105

NET 105
192.168.71.0 : 2^7 : 128 - 2 :126 /25

network      :  192.168.71.0
1st ip       :  192.168.71.1
last ip      :  192.168.71.126
broadcast    :  192.168.71.127

- R3
```
int g4/0
ip nat inside

int port 1 
ip nat outside

ip nat pool pool1 142.71.5.65 142.71.5.65 prefix 30
ip nat pool pool2 142.71.5.66 142.71.5.66 prefix 30

no access-list 1 permit 192.168.0.0 0.0.0.63
no access-list 2 permit 192.168.0.0 0.0.0.63

access-list 1 permit 192.168.71.0 0.0.0.63
access-list 2 permit 192.168.71.64 0.0.0.63


ip nat inside source list 1 pool pool1 overload
ip nat inside source list 2 pool pool2 overload

int loopback 1
ip add 142.71.5.65 255.255.255.252
```

- DSW6
```
int vlan 1
no ip add 192.168.0.1 255.255.255.128
ip add 192.168.71.1 255.255.255.128
```

- R3
```
ip dhcp pool DHCP_NET105
network 192.168.71.0 255.255.255.128
default-router 192.168.71.1 
dns-server 192.168.71.1
domain-name lab6.com
```

- PC6
```
ip 192.168.71.2 255.255.255.128 192.168.71.1
```

- R3
```
ip access-list extended NET105
remark "NET 105 should only be able to access DMZ and internet"
permit ip 192.168.71.0 0.0.0.127 142.71.5.0 0.0.0.63
deny ip 192.168.71.0 0.0.0.127 142.71.0.0 0.0.255.255
permit udp any any eq 67
permit udp any any eq 68
permit ip 192.168.71.0 0.0.0.127 any
```

```
ip access-list extended INTERNAL
remark "Allow internal network to access all except NET105"
permit icmp any any echo-reply
permit ip 192.168.71.0 0.0.0.127 any
```


