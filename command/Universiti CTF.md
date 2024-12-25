
sudo nmap -p- -v --open -n -T4  apolo.htb  -oN nmap_submerged_allports.nmap


whatweb http://apolo.htb | sed 's/,/\n -/


lynx -dump -listonly http://apolo.htb | awk '/http/{print $2}' | sort -u

gobuster dir -u http://apolo.htb/ -w /usr/share/wordlists/dirb/big.txt

nikto -h http://apolo.htb


lynx -dump -listonly http://ai.apolo.htb | awk '/http/{print $2}' | sort -u

ffuf -u http://ai.apolo.htb/FUZZ -w /usr/share/wordlists/dirb/big.txt