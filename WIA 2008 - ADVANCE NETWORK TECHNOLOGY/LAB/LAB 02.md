![[Pasted image 20241112002824.png]]

1. Configure Etherchannel

for etherchannel 

sh int status
sh int tru
sh et sum
sh et detail

make sure both the same

default int [number] : reset int to default

------R1 ------------
int g3/0
ip address 142.71.3.1 255.255.255.252
no shut

int g2/0
ip address 142.71.3.9 255.255.255.252
no shut

int g1/0
ip address 142.71.3.5 255.255.255.252
no shut


int loopback 0
ip add 142.71.4.1 255.255.255.255
no shut

ip route 142.71.4.2 255.255.255.255 142.71.3.2

ip route 142.71.2.128 255.255.255.128 142.71.3.6
ip route 142.71.2.128 255.255.255.128 142.71.3.10 10

ip route 142.71.2.0 255.255.255.128 142.71.3.6 10
ip route 142.71.2.0 255.255.255.128 142.71.3.10 

ip route 142.71.0.0 255.255.254.0 142.71.3.6
ip route 142.71.0.0 255.255.254.0 142.71.3.10 10

no ip route 0.0.0.0 0.0.0.0 142.71.3.6
no ip route 0.0.0.0 0.0.0.0 142.71.3.10 10
no ip route 0.0.0.0 0.0.0.0 142.71.3.2 10


int g1/0
ipv6 add 2001:142:71:5::1/64
int g2/0
ipv6 add 2001:142:71:6::1/64
int g3/0
ipv6 add 2001:142:71:4::1/64

int loopback 0
ipv6 add 2001:142:71:9::1/128
no shut

ipv6 route 2001:142:71:1::/64 2001:142:71:5::2
ipv6 route 2001:142:71:1::/64 2001:142:71:6::2 10 

ipv6 route 2001:142:71:3::/64 2001:142:71:5::2
ipv6 route 2001:142:71:3::/64 2001:142:71:6::2 10

ipv6 route 2001:142:71:2::/64 2001:142:71:6::2
ipv6 route 2001:142:71:2::/64 2001:142:71:5::2 10

no ipv6 route ::/0  2001:142:71:5::2
no ipv6 route ::/0  2001:142:71:6::2 10
no ipv6 route ::/0  2001:142:71:4::2 10

ipv6 unicast-routing

ipv6 route 2001:142:71:9::2/128 2001:142:71:4::2
------R2 ------------

int g3/0
ip address 142.71.3.17 255.255.255.252
no shut

int g2/0
ip address 142.71.3.13 255.255.255.252
no shut

int g1/0
ip address 142.71.3.2 255.255.255.252
no shut

int loopback 0
ip add 142.71.4.2 255.255.255.255
no shut

ip route 142.71.4.1 255.255.255.255 142.71.3.1 

ip route 142.71.2.128 255.255.255.128 142.71.3.14
ip route 142.71.2.128 255.255.255.128 142.71.3.18 10


ip route 142.71.2.0 255.255.255.128 142.71.3.14 10
ip route 142.71.2.0 255.255.255.128 142.71.3.18 

ip route 142.71.0.0 255.255.254.0 142.71.3.14
ip route 142.71.0.0 255.255.254.0 142.71.3.18  10

no ip route 0.0.0.0 0.0.0.0 142.71.3.14
no ip route 0.0.0.0 0.0.0.0 142.71.3.18  10
no ip route 0.0.0.0 0.0.0.0 142.71.3.1 10

int g1/0
ipv6 add 2001:142:71:4::2/64
int g2/0
ipv6 add 2001:142:71:7::1/64
int g3/0
ipv6 add 2001:142:71:8::1/64

int loopback 0
ipv6 add 2001:142:71:9::2/128
no shut

ipv6 route 2001:142:71:1::/64 2001:142:71:7::2
ipv6 route 2001:142:71:1::/64 2001:142:71:8::2 10 

ipv6 route 2001:142:71:3::/64 2001:142:71:7::2
ipv6 route 2001:142:71:3::/64 2001:142:71:8::2 10

ipv6 route 2001:142:71:2::/64 2001:142:71:8::2
ipv6 route 2001:142:71:2::/64 2001:142:71:7::2 10

no ipv6 route ::/0 2001:142:71:8::2
no ipv6 route ::/0 2001:142:71:7::2 10
no ipv6 route ::/0 2001:142:71:4::1 10

ipv6 route 2001:142:71:9::1/128 2001:142:71:4::1
-----DSW1---------------

int range f3/3 , f3/1
channel-group 1 mode on

port-channel load-balance src-ip

track 5 int f0/0 line-protocol
track 10 int f0/1 line-protocol


int vlan 101
standby version 2
standby 4 ipv6 fe80::1
standby 4 priority 150
standby 4 preempt
standby 4 track vlan 101 60
standby 1 ip 142.71.2.134
standby 1 priority 150 
standby 1 preempt
no standby 1 track vlan 101 60
standby 1 track 5 decrement 60
standby 1 track 10 decrement 60
standby 4 track 5 decrement 60
standby 4 track 10 decrement 60

int vlan 103
standby version 2 
standby 6 ipv6 fe80::3
standby 6 preempt
standby 6 priority 150
standby 6 track vlan 103 60
standby 3 ip 142.71.0.7
standby 3 priority 150
standby 3 preempt 
no standby track vlan 101 60
standby 3 track 5 decrement 60
standby 3 track 10 decrement 60
standby 6 track 5 decrement 60
standby 6 track 10 decrement 60

int vlan 102
standby version 2 
standby 5 ipv6 fe80::2
standby 5 preempt
standby 2 ip 142.71.2.5
standby 2 preempt

exit 
exit
sh standby br

int f0/0
ip add 142.71.3.6 255.255.255.252
no shut
int f0/1
ip add 142.71.3.14 255.255.255.252
no shut


ip route 142.71.2.128 255.255.255.128 142.71.3.5
ip route 142.71.2.128 255.255.255.128 142.71.3.13 10

ip route 142.71.2.0 255.255.255.128 142.71.3.5 
ip route 142.71.2.0 255.255.255.128 142.71.3.13 10

ip route 142.71.0.0 255.255.254.0 142.71.3.5
ip route 142.71.0.0 255.255.254.0 142.71.3.13 10

no ip route 0.0.0.0 0.0.0.0 142.71.3.5 10
no ip route 0.0.0.0 0.0.0.0 142.71.3.13 

ip route 142.71.4.1 255.255.255.255 142.71.3.5
ip route 142.71.4.2 255.255.255.255 142.71.3.13

int f0/0
ipv6 add 2001:142:71:5::2/64
int f0/1
ipv6 add 2001:142:71:7::2/64

no ipv6 route ::/0 2001:142:71:5::1
no ipv6 route ::/0 2001:142:71:7::1 10

ipv6 route 2001:142:71:9::1/128 2001:142:71:5::1
ipv6 route 2001:142:71:9::2/128 2001:142:71:7::1
---------DSW2---------------

int range f3/3 , f3/0
channel-group 1 mode on

track 1 int f0/0 line-protocol
track 10 int f0/1 line-protocol

int vlan 101
standby version 2
standby 4 ipv6 fe80::1
standby 4 preempt
standby 1 ip 142.71.2.134 
standby 1 preempt

int vlan 103
standby version 2
standby 6 ipv6 fe80::3
standby 6 preempt
standby 3 ip 142.71.0.7
standby 3 preempt

int vlan 102
standby version 2
standby 5 ipv6 fe80::2
standby 5 preempt
standby 5 priority 150
standby track vlan 102 60
standby 2 ip 142.71.2.5
standby 2 priority 150 
standby 2 preempt
no standby track vlan 102 60
standby 2 track 1 decrement 60
standby 2 track 10 decrement 60
standby 5 track 1 decrement 60
standby 5 track 10 decrement 60

exit 
exit
sh standby br


int f0/0
ip add 142.71.3.10 255.255.255.252
no shut
int f0/1
ip add 142.71.3.18 255.255.255.252
no shut


ip route 142.71.2.128 255.255.255.128 142.71.3.9
ip route 142.71.2.128 255.255.255.128 142.71.3.17 10

ip route 142.71.2.0 255.255.255.128 142.71.3.9
ip route 142.71.2.0 255.255.255.128 142.71.3.17 10

ip route 142.71.0.0 255.255.254.0 142.71.3.9
ip route 142.71.0.0 255.255.254.0 142.71.3.17 10


ip route 142.71.4.1 255.255.255.255 142.71.3.9
ip route 142.71.4.2 255.255.255.255 142.71.3.17

no ip route 0.0.0.0 0.0.0.0 142.71.3.9 
no ip route 0.0.0.0 0.0.0.0 142.71.3.17 10 


int f0/0 
ipv6 add 2001:142:71:6::2/64
int f0/1
ipv6 add 2001:142:71:8::2/64

no ipv6 route ::/0 2001:142:71:6::1
no ipv6 route ::/0 2001:142:71:8::1 10

ipv6 route 2001:142:71:9::1/128 2001:142:71:6::1
ipv6 route 2001:142:71:9::2/128 2001:142:71:8::1 

----------------PC1---------------

ip 142.71.2.133 255.255.255.128 142.71.2.134
ip 2001:142:71:1::5/64 fe80::1

-------------PC2 -----------

ip 142.71.0.5 255.255.254.0 142.71.0.7
ip 2001:142:71:3::5/64 fe80::3

-------------PC3------------

ip 142.71.0.6 255.255.254.0 142.71.0.7
ip 2001:142:71:3::6/64 fe80::3

------------PC4----------

ip 142.71.2.10 255.255.255.128 142.71.2.5
ip 2001:142:71:2::5/64 fe80::2


