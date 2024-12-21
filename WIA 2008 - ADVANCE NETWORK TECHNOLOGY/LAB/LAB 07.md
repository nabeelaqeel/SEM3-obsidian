![[Pasted image 20241203192538.png]]

![[Pasted image 20241220101204.png]]
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

```

2. Change ISP configuration

3. Configure GRE NET 105 with other team

4. Create IPSEC VPN between R-GW from VLAN 103 to DMZ

