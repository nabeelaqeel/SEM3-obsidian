![Pasted image 20241203192515.png](../../images/Pasted%20image%2020241203192515.png)
![Pasted image 20241216165453.png](../../images/Pasted%20image%2020241216165453.png)
1. DHCP for NET105 (private ip)
- R3
```
ip dhcp excluded-address 192.168.0.1 192.168.0.10
ip dhcp excluded-address 192.168.100.1 192.168.100.2

ip dhcp pool DHCP_NET105
network 192.168.0.0 255.255.255.128
default-router 192.168.0.1 
dns-server 192.168.0.1
domain-name lab6.com
```

> default-router = default-gateway


- DSW6
```
service dhcp

int vlan 1
ip helper-address 192.168.100.1 
```

- Verification
```
sh ip dhcp binding
sh ip dhcp pool
sh ip helper-address 
```

1. ACL 

```
ip access-list standart <group-name>
remark "STRING"[[PAST LAB TEST]]
permit <ip> <wildmask>

int <interface>
ip access-group <group-name> [in|out]
```

```
Router(config)# **access-list** access-list-number {**deny** | **permit** | **remark** text} protocol source source-wildcard [operator {port}] destination destination-wildcard [operator {port}] [**established**] [**log**]
```

```
ipv6 access-list access-list-name

permit protocol {source-ipv6-prefix/prefix-length | any | host  
source-ipv6-address} [port-number] {destination-ipv6-prefix/prefix-length  
| any | host destination-ipv6-address} [port-number] [dscp value] [log]  
[log-input] [sequence value]
```

3. NET 105 should only be able to access DMZ and internet

- R3
```
ip access-list extended NET105
remark "NET 105 should only be able to access DMZ and internet"
permit ip 192.168.0.0 0.0.0.127 142.71.5.0 0.0.0.63
deny ip 192.168.0.0 0.0.0.127 142.71.0.0 0.0.255.255
permit udp any any eq 67
permit udp any any eq 68
permit ip 192.168.0.0 0.0.0.127 any

```

```
int g4/0
ip access-group NET105 in
```


2. All external traffic can only access DMZ
- R2(R1)
```
ip access-list extended EXTERNAL
remark "All external traffic can only access DMZ"
remark Deny router interface for dmz
deny ip any host 142.71.5.1
permit ip any 142.71.5.0 0.0.0.63
```

```
int g4/0
ip access-group EXTERNAL in
```

```
ipv6 access-list EXTERNAL_IPV6
remark All external traffic can only access DMZ
remark Deny router interface for dmz
deny ipv6 any 2001:142:71:14::1/64 
permit ipv6 any 2001:142:71:14::/64

```

```
int g4/0
ipv6 traffic-filter EXTERNAL_IPV6 in
```
3. Internal network should be able to access all location except NET105
- R3
```
ip access-list extended INTERNAL
remark "Allow internal network to access all except NET105"
permit icmp any any echo-reply
permit ip 192.168.0.0 0.0.0.127 any
```

```
int g4/0
ip access-group INTERNAL out
```


1. DMZ cannot initialize access to anywhere
- R3
```
ip access-list extended DMZ
remark DMZ cannot initialize access to anywhere
permit icmp any any echo-reply
permit ospf any any
deny ip 142.71.5.0 0.0.0.63 any
permit ip any any

```

```
int g3/0
ip access-group DMZ in
```

```
ipv6 access-list DMZ_IPV6
remark DMZ cannot initialize access to anywhere
permit icmp any any echo-reply
deny 2001:142:71:14::/64 any 
permit ipv6 any any
```

```
int g3/0
ipv6 traffic-filter DMZ_IPV6 in
```

5. Enable Infrastructure ACL on R1
- R2(R1)
- got to combine from previous acl 
```
ip access-list extended INFRASTRUCTURE_R1
remark "All external traffic can only access DMZ"
remark Deny router interface for dmz
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
int g4/0
ip access-group INFRASTRUCTURE_R1 in 
```

```
ipv6 access-list INFRASTRUCTURE_R1_IPV6
remark All external traffic can only access DMZ
remark Deny router interface for dmz
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
int g4/0
ipv6 traffic-filter INFRASTRUCTURE_R1_IPV6 in
```
- Reference
	- [Cisco : Protecting Your Core: Infrastructure Protection Access Control Lists](https://www.cisco.com/c/en/us/support/docs/ip/access-lists/43920-iacl.html)


- Verification
```
sh ip access-list
sh ipv6 access-list
sh run | include int | ip access-group
```

1. Ensure bgp and ospf is fine
