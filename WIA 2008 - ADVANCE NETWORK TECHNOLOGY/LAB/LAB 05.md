![[../../images/Pasted image 20241112090030.png|Pasted image 20241112090030.png]]
![[../../images/Pasted image 20241217111735.png|Pasted image 20241217111735.png]]
1. Peer ISP with eBGP
```
int g0/2
ip add 100.100.100.1 255.255.255.252
ipv6 add 2001:100:100:100::1/64
no shut

```

```
router bgp 21
neighbor 100.100.100.2 remote-as 165
network 150.71.0.0 mask 255.255.0.0
network 142.71.0.0 mask 255.255.0.0

ip route 150.71.0.0 255.255.0.0 null0
```

```
ipv6 unicast-routing
router bgp 21

bgp log-neighbor-changes
neighbor 2001:100:100:100::2 remote-as 165
address-family ipv6
neighbor 2001:100:100:100::2 activate
network 2001:150:71::/48

ipv6 route 2001:150:71::/48 null0
```
2. Configure Local AAA , SSHv2
- ISP 
```
aaa new-model
username cisco password 0 cisco

ip domain-name cisco.com
crypto key generate rsa
```

```
ip ssh time-out 60
ip ssh authentication-retries 2
ip ssh version 2
```
- Only allow vlan 101 to access it
```

ip access-list standard SSH_ACCESS
permit 142.71.2.128 0.0.0.127
line vty 0 4
access-class SSH_ACCESS in
transport input ssh

```
- Verification
```
sh crypto key mypubkey rsa
show ip access-lists
show run | section line vty
show ssh
sh ip ssh
```

- R5
```
int g1/0
ip add 142.71.2.200 255.255.255.128
ipv6 add 2001:142:71:1::200/64

ip default-gateway 142.71.2.134
no ip routing
```

```
ssh -l cisco 150.100.4.1 
cisco
```
> R5 is used to test ssh to R4 


1. Configure DSW4
```
int range g0/0-2
no negotiation auto
duplex full
sw tru encapsulation dot1q
sw mode tru
sw trunk allowed vlan 1-1005

int range g0/3 , g1/0
sw mode acc

vtp mode client
vtp domain DSW
vtp password cisco

int g0/3
sw acc vlan 102
int g1/0
sw acc vlan 101
```

4. Enable port security
- DSW4
```
int range g0/3 , g1/0
sw port-security
sw port max 1
switchport port-security violation restrict
sw port mac sticky
```
5. Change native vlan to 99 to all L2 , L3

- DSW1
```
vlan database
vlan 99
apply 
abort

int range port 1 , f3/2 , f3/0
switchport trunk native vlan 99
```

- DSW2
```
int range port 1 , f3/1 - 2
switchport trunk native vlan 99
```

- DSW3 
```
int range f3/0  , f3/4
switchport trunk native vlan 99
```

- DSW4 
```
int range g0/0 - 1
switchport trunk native vlan 99
```

- Verification 
```
sh int tru
```

6. Spanning tree port -fast , BPDU guard on 

- DSW3
```
int range f3/1 - 3
sw mode acc
span portfast
spanning-tree portfast bpduguard 
no shut
```

- Verification
```
sh span sum
```
7. DHCP server
- R1(R2)
```
ip dhcp excluded-address 142.71.2.1 142.71.2.10

ip dhcp pool DHCP_VLAN102
network 142.71.2.0 255.255.255.128
default-router 142.71.2.5
dns-server 142.71.2.6
domain-name lab5.com

```

- DSW1 
```
int vlan 102
standby 2 name vlan102_hsrp
service dhcp

int vlan 102
ip helper-address 142.71.3.5 redundancy vlan102_hsrp
```
- DSW2
```
service dhcp
int vlan 102
standby 2 name vlan102_hsrp

int vlan 102
ip helper-address 142.71.3.9 redundancy vlan102_hsrp
```
- Verification 
```
sh ip dhcp binding
sh ip dhcp pool
```

8. IP dhcp snooping and DAI on DSW4
- DSW4
```
ip dhcp snooping
ip dhcp snooping vlan 102
ip arp inspection vlan 102

int range g0/0 - 1 , g 0/3 , g 1/0
ip dhcp snooping trust
ip arp inspection trust


int range g 0/3 , g1/0
no ip dhcp snooping trust
no ip arp inspection trust
```

- Verification
```
show ip dhcp snooping
show ip arp inspection
```
## Reference 
- [Cisco](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_usr_ssh/configuration/xe-16/sec-usr-ssh-xe-16-book/sec-secure-shell-v2.html)
- https://www.cisco.com/c/en/us/support/docs/security-vpn/secure-shell-ssh/4145-ssh.html

## Comment
- Check balik snooping boleh ke trust semua orang