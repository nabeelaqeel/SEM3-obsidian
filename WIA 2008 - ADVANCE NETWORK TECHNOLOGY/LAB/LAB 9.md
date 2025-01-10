![[../../images/Pasted image 20241221185926.png]]
1. Download and install VM 
- [Github](https://github.com/mininet/openflow-tutorial/wiki/Installing-Required-Software)

2. Based on 
- [Github](https://github.com/mininet/openflow-tutorial/wiki/Learn-Development-Tools)



- Creating the topology
```python
from mininet.topo import Topo

class MyTopo( Topo ):
    "Custom topology example."

    def build( self ):
        "Create custom topology."

        # Add switches
        s1 = self.addSwitch( 's1' )
        s2 = self.addSwitch( 's2' )
        s3 = self.addSwitch( 's3' )
        s4 = self.addSwitch( 's4' )
        s5 = self.addSwitch( 's5' )

        # Add hosts
        h1 = self.addHost( 'h1' )
        h2 = self.addHost( 'h2' )
        h3 = self.addHost( 'h3' )
        h4 = self.addHost( 'h4' )

        # Add links
        self.addLink( h1, s1 )  # h1 <-> s1
        self.addLink( h2, s3 )  # h2 <-> s3
        self.addLink( h3, s2 )  # h3 <-> s2
        self.addLink( h4, s5 )  # h4 <-> s5

        self.addLink( s1, s2 )  # s1 <-> s2
        self.addLink( s1, s3 )
        
        self.addLink( s5, s2 )
        self.addLink( s5, s3 )
        
        self.addLink( s1, s4 )
        self.addLink( s2, s4 )
        self.addLink( s3, s4 )
        self.addLink( s5, s4 )
        
        
topos = { 'mytopo': ( lambda: MyTopo() ) }


```

```
sudo mn --custom ~/mininet/custom/lab9.py --topo mytopo
```

- Verification
```
nodes
h1 ifconfig
```

```
 sudo ovs-ofctl show s1
 sudo ovs-ofctl dump-flows s1
```

./pox.py traffic_rules --openflow.of_01 --port=6633

- https://youtu.be/OlQr9JM23Wk
### 3. **Define Traffic Rules**

The problem specifies traffic routing requirements:

#### i. **Ping and HTTP traffic from H1 to H4**:

- Use OpenFlow rules to route ping through `s1 -> s2 -> s5` and HTTP traffic through `s1 -> s4 -> s5`.

#### ii. **H2 to H3 traffic**:

- Route all traffic through `s3 -> s4 -> s1 -> s2`.

To set these rules, you can use an SDN controller like OpenDaylight, Ryu, or create custom OpenFlow rules. Let me know if you need help setting up traffic rules or configuring a specific SDN controller!



```python
from pox.core import core
from pox.openflow import *
from pox.lib.addresses import IPAddr
from pox.lib.revent import EventMixin

class TrafficRules(EventMixin):
    def __init__(self, connection):
        self.connection = connection
        connection.addListeners(self)

    def _handle_ConnectionUp(self, event):
        msg = ofp_flow_mod()
        
        # Ping traffic (H1 to H4 via s1 -> s2 -> s5)
        msg.match = ofp_match(in_port=1, dl_type=0x0800, nw_proto=1)  # ICMP
        msg.actions.append(ofp_action_output(port=2))
        self.connection.send(msg)

        # HTTP traffic (H1 to H4 via s1 -> s4 -> s5)
        msg.match = ofp_match(in_port=1, dl_type=0x0800, nw_proto=6, tp_dst=80)  # TCP port 80 (HTTP)
        msg.actions.append(ofp_action_output(port=3))
        self.connection.send(msg)

        # H2 to H3 traffic via s3 -> s4 -> s1 -> s2
        msg.match = ofp_match(in_port=1, dl_type=0x0800)
        msg.actions.append(ofp_action_output(port=2))
        self.connection.send(msg)

def launch():
    core.openflow.addListenerByName("ConnectionUp", TrafficRules)

```

```
sudo ./pox.py forwarding.l2_learning
```

----

LEARNING



user : mininet
password : mininet

After setup port-forwarding 
can ssh 
```
 ssh -Y -l mininet -p 2222 localhost
```


Current Stage
https://github.com/mininet/openflow-tutorial/wiki/Create-a-Learning-Switch


- mininet

```
sudo mn --topo single,3 --mac --controller remote --switch ovsk
```

```
xterm h1 h2
ping all
```

- host
```
tcpdump -XX -n -i h2-eth0
ping -c1 10.0.0.2
```


Current 

```
sudo mn --topo single,3 --mac --controller remote --switch ovsk
```

```
sudo ./pox.py log.level --DEBUG openflow.debug forwarding.l2_learning
```


- How to create custom topology
```python
"""Custom topology example

Two directly connected switches plus a host for each switch:

   host --- switch --- switch --- host

Adding the 'topos' dict with a key/value pair to generate our newly defined
topology enables one to pass in '--topo=mytopo' from the command line.
"""

from mininet.topo import Topo

class MyTopo( Topo ):
    "Simple topology example."

    def build( self ):
        "Create custom topo."

        # Add hosts and switches
        leftHost = self.addHost( 'h1' )
        rightHost = self.addHost( 'h2' )
        leftSwitch = self.addSwitch( 's3' )
        rightSwitch = self.addSwitch( 's4' )

        # Add links
        self.addLink( leftHost, leftSwitch )
        self.addLink( leftSwitch, rightSwitch )
        self.addLink( rightSwitch, rightHost )


topos = { 'mytopo': ( lambda: MyTopo() ) }
```