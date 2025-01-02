
SUMMARY STEPS  
```
snmp-server group [group-name {v1 | v2c | v3 [auth | noauth | priv]}] [read read-view] [write write-view] [notify notify-view] [access access-list]  

snmp-server engineID {local engine-id | remote ip-address [udp-port udp-port-number] [vrf vrf-name] engine-id-string}  

snmp-server user user-name group-name [remote ip-address [udp-port port]] {v1 | v2c | v3 [encrypted] [auth {md5 | sha} auth-password]} [access access-list]  
```

Reference
- [Cisco nm-snmp-snmpv3](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/snmp/configuration/xe-3se/5700/snmp-xe-3se-5700-book/nm-snmp-snmpv3.pdf)
