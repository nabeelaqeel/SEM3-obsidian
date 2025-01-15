![../../images/Pasted image 20241221185926.png](../../images/Pasted%20image%2020241221185926.png)
1. Download and install VM 
- [Github](https://github.com/mininet/openflow-tutorial/wiki/Installing-Required-Software)

2. Based on 
- [Github](https://github.com/mininet/openflow-tutorial/wiki/Learn-Development-Tools)
```
username : mininet
password : mininet
```

3. Design SDN
- Creating the topology
```
sudo mn --custom ~/mininet/custom/lab9.py --topo mytopo --controller remote
```

```
cd pox
./pox.py lab9 log.level --DEBUG
```

	1. h1 ping -c1 h4 : it will resolve arp first so it will not reach
	2. h1 ping -c1 h4 : it can reach now
	3. h4 python3 -m http.server 80
	4. h1 wget http://10.0.0.4
	5. h2 ping -c1 h3

- Verification on switch
```
sudo ovs-ofctl dump-flows s2
sudo ovs-ofctl dump-flows s4
```
----

## Python Code

- Topo.py
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


- lab9.py
```python
from pox.core import core

import pox.openflow.libopenflow_01 as of

from pox.lib.util import dpid_to_str

log = core.getLogger()

  

# Global variables for switch DPIDs

vs1_dpid, vs2_dpid, vs3_dpid,vs4_dpid, vs5_dpid = 0, 0, 0, 0, 0

  

def _ConnectionUp(event):

    """Handle new switch connections."""

    global vs1_dpid, vs2_dpid, vs3_dpid, vs4_dpid, vs5_dpid

  

    for m in event.connection.features.ports:

  
  

        if m.name == "s1-eth1":

            vs1_dpid = event.connection.dpid

        elif m.name == "s2-eth1":

            vs2_dpid = event.connection.dpid

        elif m.name == "s3-eth1":

            vs3_dpid = event.connection.dpid

        elif m.name == "s4-eth1":

            vs4_dpid = event.connection.dpid

        elif m.name == "s5-eth1":

            vs5_dpid = event.connection.dpid

  

def _PacketIn(event):

  

    """Handle packets arriving at the controller."""

    global vs1_dpid, vs2_dpid,  vs3_dpid, vs4_dpid, vs5_dpid

    # Define flow rules for s1

    if event.connection.dpid == vs1_dpid:

  

        # Ping traffic: H1 to H4 via s2

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=2),  # Forward to s2

            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # ICMP

        ))

  

        # Return: H4 to H1 (ICMP)

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=1),  # Forward to H1

            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.4", nw_dst="10.0.0.1")  # ICMP

        ))

  
  

        # HTTP traffic: H1 to H4 via s4

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=4),  # Forward to s4

            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_dst=80, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # HTTP

        ))

  

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=1),  # Forward to s4

            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_src=80, nw_src="10.0.0.4", nw_dst="10.0.0.1")  # HTTP

        ))

  

        #H2 TO H3

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=2),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.3")  # ICMP

        ))

  

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=4),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.3", nw_dst="10.0.0.2")  # ICMP

        ))

  

  

       # Rule for ARP packets destined for 10.0.0.1

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.1")

        msg.actions.append(of.ofp_action_output(port=1))

        event.connection.send(msg)

  

        # Rule for ARP packets destined for 10.0.0.4

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.4")

        msg.actions.append(of.ofp_action_output(port=2))

        event.connection.send(msg)

  

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.2")

        msg.actions.append(of.ofp_action_output(port=4))

        event.connection.send(msg)

  

        # Rule for ARP packets destined for 10.0.0.4

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.3")

        msg.actions.append(of.ofp_action_output(port=2))

        event.connection.send(msg)

  
  
  

    # Define flow rules for s2

    elif event.connection.dpid == vs2_dpid:

        # Ping traffic: Forward to s4

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=4),

            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # ICMP

        ))

  

        # Return: H4 to H1 (ICMP)

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=2),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.4", nw_dst="10.0.0.1")  # ICMP

        ))

  

        #H2 TO H3

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=1),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.3")  # ICMP

        ))

  

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=2),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.3", nw_dst="10.0.0.2")  # ICMP

        ))

  

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.1")

        msg.actions.append(of.ofp_action_output(port=2))

        event.connection.send(msg)

  

        # Rule for ARP packets destined for 10.0.0.4

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.4")

        msg.actions.append(of.ofp_action_output(port=4))

        event.connection.send(msg)

  

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.2")

        msg.actions.append(of.ofp_action_output(port=2))

        event.connection.send(msg)

  

        # Rule for ARP packets destined for 10.0.0.4

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.3")

        msg.actions.append(of.ofp_action_output(port=1))

        event.connection.send(msg)

  
  
  

    elif event.connection.dpid == vs3_dpid:

  

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=4),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.3")  # ICMP

        ))

  

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=1),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.3", nw_dst="10.0.0.2")  # ICMP

        ))

  
  

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.2")

        msg.actions.append(of.ofp_action_output(port=1))

        event.connection.send(msg)

  

        # Rule for ARP packets destined for 10.0.0.4

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.3")

        msg.actions.append(of.ofp_action_output(port=4))

        event.connection.send(msg)

  
  

    # Define flow rules for s4

    elif event.connection.dpid == vs4_dpid:

        # Ping traffic: Forward to s5

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=4),

            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # ICMP

        ))

  

        # Return: H4 to H1 (ICMP)

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=2),  # Forward to vSwitch2

            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.4", nw_dst="10.0.0.1")  # ICMP

        ))

  

        # HTTP traffic: Forward to s5

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=4),

            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_dst=80, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # HTTP

        ))

  

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=1),

            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_src=80, nw_src="10.0.0.4", nw_dst="10.0.0.1")  # HTTP

        ))

  

        #H2 TO H3

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=1),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.3")  # ICMP

        ))

  

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=3),  # Forward to vSwitch1

            match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.3", nw_dst="10.0.0.2")  # ICMP

        ))

  

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.1")

        msg.actions.append(of.ofp_action_output(port=2))

        event.connection.send(msg)

  

        # Rule for ARP packets destined for 10.0.0.4

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.4")

        msg.actions.append(of.ofp_action_output(port=4))

        event.connection.send(msg)

  

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.2")

        msg.actions.append(of.ofp_action_output(port=3))

        event.connection.send(msg)

  

        # Rule for ARP packets destined for 10.0.0.4

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.3")

        msg.actions.append(of.ofp_action_output(port=1))

        event.connection.send(msg)

  
  
  

    # Define flow rules for s5

    elif event.connection.dpid == vs5_dpid:

        # Ping traffic: Deliver to H4

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=1),

            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # ICMP

        ))

  

        # Return: H4 to H1 (ICMP)

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=4),  # Forward to vSwitch4

            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.4", nw_dst="10.0.0.1")  # ICMP

        ))

  

        # HTTP traffic: Deliver to H4

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=1),

            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_dst=80, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # HTTP

        ))

  

        event.connection.send(of.ofp_flow_mod(

            action=of.ofp_action_output(port=4),

            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_src=80, nw_src="10.0.0.4", nw_dst="10.0.0.1")  # HTTP

        ))

  
  

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.1")

        msg.actions.append(of.ofp_action_output(port=4))

        event.connection.send(msg)

  

        # Rule for ARP packets destined for 10.0.0.4

        msg = of.ofp_flow_mod()

        msg.priority = 200

        msg.match = of.ofp_match(dl_type=0x806, nw_dst="10.0.0.4")

        msg.actions.append(of.ofp_action_output(port=1))

        event.connection.send(msg)

  
  

def launch():

    """Start the POX controller."""

    core.openflow.addListenerByName("ConnectionUp", _ConnectionUp)

    core.openflow.addListenerByName("PacketIn", _PacketIn)
```








---
## My Reference

- [Medium](https://medium.com/@deelaka.perera/simple-network-topology-using-mininet-and-installing-flow-rules-directly-on-controller-3ec61ca2b962)

<details>
<summary>Python Code</summary>

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


```python
from pox.core import core  
import pox.openflow.libopenflow_01 as of  
from pox.lib.util import dpid_to_str  
from pox.openflow.of_json import*  
log = core.getLogger()  
s1_dpid = 0  
s2_dpid = 0  
s3_dpid = 0  
s4_dpid = 0  
def _ConnectionUp (event):  
    global s1_dpid, s2_dpid, s3_dpid, s4_dpid  
    for m in event.connection.features.ports:  
        if m.name == "s1-eth1":  
            s1_dpid = event.connection.dpid  
        elif m.name == "s2-eth1":  
            s2_dpid = event.connection.dpid  
        elif m.name == "s3-eth1":  
            s3_dpid = event.connection.dpid  
        elif m.name == "s4-eth1":  
            s4_dpid = event.connection.dpiddef _PacketIn (event):  
    global s1_dpid, s2_dpid, s3_dpid, s4_dpid  
    if event.connection.dpid == s1_dpid:  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.5")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.1", nw_dst="10.0.0.5")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.1", nw_dst="10.0.0.5")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.5", nw_dst="10.0.0.1")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.5", nw_dst="10.0.0.2")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=2),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.1", nw_dst="10.0.0.2")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=3),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.1", nw_dst="10.0.0.3")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=3),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.1", nw_dst="10.0.0.4")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=1),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.1")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=3),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.3")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=3),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.4")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=1),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.0/24", nw_dst="10.0.0.1")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=2),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.0/24", nw_dst="10.0.0.2")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_ALL), match=of.ofp_match(dl_type=0x806)))  
    elif event.connection.dpid == s2_dpid:  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=2),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.3", nw_dst="10.0.0.1")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=2),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.3", nw_dst="10.0.0.2")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=3),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.3", nw_dst="10.0.0.4")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=4),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.3", nw_dst="10.0.0.5")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=1),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.0/24", nw_dst="10.0.0.3")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_ALL),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.0/24", nw_dst="10.0.0.0/24")))   
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_ALL), match=of.ofp_match(dl_type=0x806)))  
    elif event.connection.dpid == s3_dpid:  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=2),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.4", nw_dst="10.0.0.0/24")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=1),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.0/24", nw_dst="10.0.0.4")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_ALL), match=of.ofp_match(dl_type=0x806)))  
    elif event.connection.dpid == s4_dpid:  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.1", nw_dst="10.0.0.5")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.2", nw_dst="10.0.0.5")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.5", nw_dst="10.0.0.1")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_NONE),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.5", nw_dst="10.0.0.2")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=2),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.5", nw_dst="10.0.0.3")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=2),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.5", nw_dst="10.0.0.4")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=1),match=of.ofp_match(dl_type=0x800, nw_src="10.0.0.0/24", nw_dst="10.0.0.5")))  
        event.connection.send(of.ofp_flow_mod(action=of.ofp_action_output(port=of.OFPP_ALL), match=of.ofp_match(dl_type=0x806)))def launch():  
    core.openflow.addListenerByName("ConnectionUp", _ConnectionUp)  
    core.openflow.addListenerByName("PacketIn", _PacketIn)
```



```python
from pox.core import core
import pox.openflow.libopenflow_01 as of
from pox.lib.util import dpid_to_str
log = core.getLogger()

# Global variables for switch DPIDs
vs1_dpid, vs2_dpid, vs4_dpid, vs5_dpid = 0, 0, 0, 0

def _ConnectionUp(event):
    """Handle new switch connections."""
    global vs1_dpid, vs2_dpid, vs4_dpid, vs5_dpid
    for m in event.connection.features.ports:
        if m.name == "vSwitch1-eth1":
            vs1_dpid = event.connection.dpid
        elif m.name == "vSwitch2-eth1":
            vs2_dpid = event.connection.dpid
        elif m.name == "vSwitch4-eth1":
            vs4_dpid = event.connection.dpid
        elif m.name == "vSwitch5-eth1":
            vs5_dpid = event.connection.dpid

def _PacketIn(event):
    """Handle packets arriving at the controller."""
    global vs1_dpid, vs2_dpid, vs4_dpid, vs5_dpid

    # Define flow rules for vSwitch1
    if event.connection.dpid == vs1_dpid:
        # Ping traffic: H1 to H4 via vSwitch2
        event.connection.send(of.ofp_flow_mod(
            action=of.ofp_action_output(port=2),  # Forward to vSwitch2
            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # ICMP
        ))
        # HTTP traffic: H1 to H4 via vSwitch4
        event.connection.send(of.ofp_flow_mod(
            action=of.ofp_action_output(port=3),  # Forward to vSwitch4
            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_dst=80, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # HTTP
        ))

    # Define flow rules for vSwitch2
    elif event.connection.dpid == vs2_dpid:
        # Ping traffic: Forward to vSwitch4
        event.connection.send(of.ofp_flow_mod(
            action=of.ofp_action_output(port=2),
            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # ICMP
        ))

    # Define flow rules for vSwitch4
    elif event.connection.dpid == vs4_dpid:
        # Ping traffic: Forward to vSwitch5
        event.connection.send(of.ofp_flow_mod(
            action=of.ofp_action_output(port=2),
            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # ICMP
        ))
        # HTTP traffic: Forward to vSwitch5
        event.connection.send(of.ofp_flow_mod(
            action=of.ofp_action_output(port=3),
            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_dst=80, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # HTTP
        ))

    # Define flow rules for vSwitch5
    elif event.connection.dpid == vs5_dpid:
        # Ping traffic: Deliver to H4
        event.connection.send(of.ofp_flow_mod(
            action=of.ofp_action_output(port=1),
            match=of.ofp_match(dl_type=0x800, nw_proto=1, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # ICMP
        ))
        # HTTP traffic: Deliver to H4
        event.connection.send(of.ofp_flow_mod(
            action=of.ofp_action_output(port=1),
            match=of.ofp_match(dl_type=0x800, nw_proto=6, tp_dst=80, nw_src="10.0.0.1", nw_dst="10.0.0.4")  # HTTP
        ))

def launch():
    """Start the POX controller."""
    core.openflow.addListenerByName("ConnectionUp", _ConnectionUp)
    core.openflow.addListenerByName("PacketIn", _PacketIn)

```

</details>