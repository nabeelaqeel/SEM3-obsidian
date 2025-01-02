
SNMP is an [[application layer protocol]] that provides a message format for communication between managers and agents. The SNMP system consists of` three elements` : 

- SNMP manager
- SNMP agents (managed node)
- Management Information Base (MIB)

To configure SNMP on a networking device, it is first necessary to define the relationship between the manager and the agent.

The SNMP manager is part of a network management system (NMS). The SNMP manager runs SNMP management software. As shown in the figure, the SNMP manager can collect information from an SNMP agent by using the “get” action and can change configurations on an agent by using the “set” action. In addition, SNMP agents can forward information directly to a network manager by using “traps”.
![[../images/Pasted image 20250102092727.png]]
The SNMP agent and MIB reside on SNMP client devices. Network devices that must be managed, such as switches, routers, servers, firewalls, and workstations, are equipped with an SNMP agent software module. MIBs store data about the device and operational statistics and are meant to be available to authenticated remote users. The SNMP agent is responsible for providing access to the local MIB.

SNMP defines how management information is exchanged between network management applications and management agents. The SNMP manager polls the agents and queries the MIB for SNMP agents on UDP port 161. SNMP agents send any SNMP traps to the SNMP manager on UDP port 162.


### SNMP Agent Traps
![[../images/Pasted image 20250102093041.png]]
![[../images/Pasted image 20250102093056.png]]
SUMMARY STEPS  
```
snmp-server group [group-name {v1 | v2c | v3 [auth | noauth | priv]}] [read read-view] [write write-view] [notify notify-view] [access access-list]  

snmp-server engineID {local engine-id | remote ip-address [udp-port udp-port-number] [vrf vrf-name] engine-id-string}  

snmp-server user user-name group-name [remote ip-address [udp-port port]] {v1 | v2c | v3 [encrypted] [auth {md5 | sha} auth-password]} [access access-list]  
```

Reference
- [Cisco nm-snmp-snmpv3](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/snmp/configuration/xe-3se/5700/snmp-xe-3se-5700-book/nm-snmp-snmpv3.pdf)
