The image outlines a network topology with configuration tasks. Below are the configuration steps based on the diagram and the tasks provided:

### Key Tasks and Commands

1. **Peer ISP using eBGP:**
    
    - Configure eBGP on the ISP router (`R1_AS2X`).
    - Example commands:
        
        bash
        
        Copy code
        
        `router bgp <AS_NUMBER> neighbor <ISP_PEER_IPv4> remote-as <PEER_AS> neighbor <ISP_PEER_IPv6> remote-as <PEER_AS> network <YOUR_NETWORK> mask <MASK>`
        
2. **Configure Local AAA for SSHv2 Access:**
    
    - Enable AAA authentication and restrict SSH access to VLAN 101.
    - Example commands:
        
        bash
        
        Copy code
        
        `aaa new-model aaa authentication login default local username admin privilege 15 secret <PASSWORD> line vty 0 4 transport input ssh login local ip access-list standard SSH_ACCESS permit <VLAN_101_SUBNET> deny any access-class SSH_ACCESS in`
        
3. **Change Native VLAN to 99 for All Trunks:**
    
    - Update trunk configurations to use VLAN 99 as the native VLAN.
    - Example commands:
        
        bash
        
        Copy code
        
        `interface <TRUNK_INTERFACE> switchport trunk encapsulation dot1q switchport trunk native vlan 99 switchport mode trunk`
        
4. **Enable Port Security on DSW4:**
    
    - Configure port security to allow limited MAC addresses.
    - Example commands:
        
        bash
        
        Copy code
        
        `interface <SWITCH_PORT> switchport mode access switchport port-security switchport port-security maximum <NUMBER> switchport port-security mac-address sticky`
        
5. **Enable Spanning Tree Features on DSW3:**
    
    - Configure `portfast` and `BPDU guard` for VLAN 101 and VLAN 103.
    - Example commands:
        
        bash
        
        Copy code
        
        `interface <ACCESS_INTERFACE> spanning-tree portfast spanning-tree bpduguard enable`
        
6. **Configure DHCP Server on R2 for VLAN 102:**
    
    - Enable DHCP service and configure a DHCP pool on R2.
    - Example commands:
        
        bash
        
        Copy code
        
        `service dhcp ip dhcp excluded-address <START_IP> <END_IP> ip dhcp pool VLAN102 network <VLAN102_SUBNET> <SUBNET_MASK> default-router <DEFAULT_GATEWAY> dns-server <DNS_IP>`
        
7. **Configure DHCP Snooping and DAI on DSW4:**
    
    - Enable DHCP snooping and DAI for security.
    - Example commands:
        
        bash
        
        Copy code
        
        `ip dhcp snooping ip dhcp snooping vlan 102 interface <TRUSTED_INTERFACE> ip dhcp snooping trust ip arp inspection vlan 102`
        

Let me know if you need specific clarifications or additional configurations