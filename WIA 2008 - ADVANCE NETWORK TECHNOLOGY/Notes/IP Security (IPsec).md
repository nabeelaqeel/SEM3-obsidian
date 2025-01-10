IPsec is an [Internet Engineering Task Force (IETF)](../../Others/Internet%20Engineering%20Task%20Force%20(IETF).md) standard (RFC 2401-2412) that defines how a [VPN](VPN.md) can be secured across IP networks. IPsec protects and authenticates IP packets between source and destination. IPsec can protect traffic from `Layer 4 through Layer 7`.

Using the IPsec framework, IPsec provides these essential security functions:

- **Confidentiality** - IPsec uses encryption algorithms to prevent cybercriminals from reading the packet contents.
- **Integrity** - IPsec uses hashing algorithms to ensure that packets have not been altered between source and destination.
- **Origin authentication** - IPsec uses the Internet Key Exchange (IKE) protocol to authenticate source and destination. Methods of authentication including using pre-shared keys (passwords), digital certificates, or RSA certificates.
- **Diffie-Hellman** - Secure key exchange typically using various groups of the DH algorithm.

IPsec is not bound to any specific rules for secure communications. This flexibility of the framework allows IPsec to easily integrate new security technologies without updating the existing IPsec standards. The currently available technologies are aligned to their specific security function. The open slots shown in the IPsec framework in the figure can be filled with any of the choices that are available for that IPsec function to create a unique [[security association (SA)]].

![../../images/Pasted image 20241230173215.png](../../images/Pasted%20image%2020241230173215.png)
![../../images/Pasted image 20241230173230.png](../../images/Pasted%20image%2020241230173230.png)

## IPsec Protocol
Choosing the IPsec protocol encapsulation is the first building block of the framework. IPsec encapsulates packets using Authentication Header (AH) or Encapsulation Security Protocol (ESP). The choice of AH or ESP establishes which other building blocks are available.

>- AH is appropriate only when confidentiality is not required or permitted. It provides data authentication and integrity, but it does not provide data confidentiality (encryption). All text is transported unencrypted.
>- ESP provides both confidentiality and authentication. It provides confidentiality by performing encryption on the IP packet. ESP provides authentication for the inner IP packet and ESP header. Authentication provides data origin authentication and data integrity. Although both encryption and authentication are optional in ESP, at a minimum, one of them must be selected.


## Confidentiality
Confidentiality is achieved by encrypting the data, as shown in the figure. The degree of confidentiality depends on the encryption algorithm and the length of the key used in the encryption algorithm. If someone tries to hack the key through a brute-force attack, the number of possibilities to try is a function of the length of the key. The time to process all the possibilities is a function of the computer power of the attacking device. The shorter the key, the easier it is to break. A 64-bit key can take approximately one year to break with a relatively sophisticated computer. A 128-bit key with the same machine can take roughly 1019 or 10 quintillion years to decrypt.

![../../images/Pasted image 20241230173457.png](../../images/Pasted%20image%2020241230173457.png)

The encryption algorithms highlighted in the figure are all symmetric key cryptosystems.

![../../images/Pasted image 20241230173611.png](../../images/Pasted%20image%2020241230173611.png)

>- DES uses a 56-bit key and should be avoided.
>- 3DES is a variant of the 56-bit DES. It uses three independent 56-bit encryption keys per 64-bit block, which provides significantly stronger encryption strength over DES. DES is computationally taxing and is no longer considered to be secure.
>- AES is the most recommended symmetric encryption algorithm. It provides stronger security than DES and is computationally more efficient than 3DES. AES offers three different key lengths: 128 bits, 192 bits, and 256 bits.
>- SEAL is a stream cipher, which means it encrypts data continuously rather than encrypting blocks of data. SEAL uses a 160-bit key and is considered to be very secure.

## Integrity
Data integrity means that the data that is received is exactly the same data that was sent. Potentially, data could be intercepted and modified. For example, in the figure, assume that a check for $100 is written to Alex. The check is then mailed to Alex, but it is intercepted by a threat actor. The threat actor changes the name on the check to Jeremy and the amount on the check to $1,000 and attempts to cash it. Depending on the quality of the forgery in the altered check, the attacker could be successful.
![../../images/Pasted image 20241230173756.png](../../images/Pasted%20image%2020241230173756.png)

Because [VPN](VPN.md) data is transported over the public internet, a method of proving data integrity is required to guarantee that the content has not been altered. The [[Hashed Message Authentication Code (HMAC)]] is a data integrity algorithm that guarantees the integrity of the message using a hash value. The figure highlights the two most common HMAC algorithms.

**Note:** Cisco now rates SHA-1 as legacy and recommends at least SHA-256 for integrity.

![../../images/Pasted image 20241230173909.png](../../images/Pasted%20image%2020241230173909.png)
>- Message-Digest 5 (MD5) uses a 128-bit shared-secret key. The variable-length message and 128-bit shared secret key are combined and run through the HMAC-MD5 hash algorithm. The output is a 128-bit hash. MD5 is no longer secure should be avoided.
>- The Secure Hash Algorithm (SHA) uses a 160-bit secret key. The variable-length message and the 160-bit shared secret key are combined and run through the HMAC-SHA-1 algorithm. The output is a 160-bit hash. SHA-256 or higher are considered to be secure.

## Authentication
When conducting business long distance, you must know who is at the other end of the phone, email, or fax. The same is true of VPN networks. The device on the other end of the VPN tunnel must be authenticated before the communication path is considered secure. The figure highlights the two peer authentication methods.

The figure shows the different Authentication options. The options are P S K as least secure and R S A as more secure.

![../../images/Pasted image 20241230174029.png](../../images/Pasted%20image%2020241230174029.png)

>- A pre-shared secret key (PSK) value is entered into each peer manually. The PSK is combined with other information to form the authentication key. PSKs are easy to configure manually, but do not scale well, because each IPsec peer must be configured with the PSK of every other peer with which it communicates.
>- Rivest, Shamir, and Adleman (RSA) authentication uses digital certificates to authenticate the peers. The local device derives a hash and encrypts it with its private key. The encrypted hash is attached to the message and is forwarded to the remote end and acts like a signature. At the remote end, the encrypted hash is decrypted using the public key of the local end. If the decrypted hash matches the recomputed hash, the signature is genuine. Each peer must authenticate its opposite peer before the tunnel is considered secure.

The figure shows an example of PSK authentication. At the local device, the authentication key and the identity information are sent through a hash algorithm to form the hash for the local peer (Hash_L). One-way authentication is established by sending Hash_L to the remote device. If the remote device can independently create the same hash, the local device is authenticated. After the remote device authenticates the local device, the authentication process begins in the opposite direction, and all steps are repeated from the remote device to the local device.

## PSK Authentication
![../../images/Pasted image 20241230175314.png](../../images/Pasted%20image%2020241230175314.png)
The figure shows an example of [[RSA]] authentication. At the local device, the authentication key and identity information are sent through the hash algorithm to form the hash for the local peer (Hash_L). Then the Hash_L is encrypted using the local device’s private encryption key. This creates a digital signature. The digital signature and a digital certificate are forwarded to the remote device. The public encryption key for decrypting the signature is included in the digital certificate. The remote device verifies the digital signature by decrypting it using the public encryption key. The result is Hash_L. Next, the remote device independently creates Hash_L from stored information. If the calculated Hash_L equals the decrypted Hash_L, the local device is authenticated. After the remote device authenticates the local device, the authentication process begins in the opposite direction and all steps are repeated from the remote device to the local device.

## RSA Authentication
![../../images/Pasted image 20241230175709.png](../../images/Pasted%20image%2020241230175709.png)

## Secure Key Exchange with Diffie-Hellman
Encryption algorithms require a symmetric, shared secret key to perform encryption and decryption. How do the encrypting and decrypting devices get the shared secret key? The easiest key exchange method is to use a public key exchange method, such as Diffie-Hellman (DH), as shown in the figure.

![../../images/Pasted image 20241230180049.png](../../images/Pasted%20image%2020241230180049.png)
DH provides a way for two peers to establish a shared secret key that only they know, even though they are communicating over an insecure channel. Variations of the DH key exchange are specified as DH groups:

- DH groups 1, 2, and 5 should no longer be used. These groups support a key size of 768 bits, 1024 bits, and 1536 bits, respectively.
- DH groups 14, 15, and 16 use larger key sizes with 2048 bits, 3072 bits, and 4096 bits, respectively, and are recommended for use until 2030.
- DH groups 19, 20, 21 and 24 with respective key sizes of 256 bits, 384 bits, 521 bits, and 2048 bits support [[Elliptical Curve Cryptography (ECC)]], which reduces the time needed to generate keys. DH group 24 is the preferred next generation encryption.

The DH group you choose must be strong enough, or have enough bits, to protect the IPsec keys during negotiation. For example, DH group 1 is strong enough to support DES and 3DES encryption, but not AES. For example, if the encryption or authentication algorithms use a 128-bit key, use group 14, 19, 20 or 24. However, if the encryption or authentication algorithms use a 256-bit key or higher, use group 21 or 24

## IPsec Tunnel and Tunnel Mode

![../../images/Pasted image 20241230180419.png](../../images/Pasted%20image%2020241230180419.png)
