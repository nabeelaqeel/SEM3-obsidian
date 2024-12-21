
![[Pasted image 20241221130451.png]]
- Linux syscall
	- https://chromium.googlesource.com/chromiumos/docs/+/master/constants/syscalls.md
	- to write asm read this

- CmakeList.txt
	- cmake --version


- lexical analysis

Part 1

<details>
<summary>c++ code</summary>

```cpp
#include <iostream>
#include <fstream>
#include <sstream>
#include <optional>
#include <vector>

enum class TokenType
{
    _return,
    int_lit,
    semi
};

struct Token
{
    TokenType type;
    std::optional<std::string> value{};
};

std::vector<Token> tokenize(const std::string& str)
{
    std::vector<Token> tokens;

    std::string buf;
    for (int i = 0; i < str.length(); i++)
    {
        char c = str.at(i);
        if (std::isalpha(c))
        {
            buf.push_back(c);
            i++;
            while (std::isalnum(str.at(i)))
            {
                buf.push_back(str.at(i));
                i++;
            }
            i--;
            if (buf == "return")
            {
                tokens.push_back({.type = TokenType::_return});
                buf.clear();
                continue;
            } else
            {
                std::cerr << "You messed up!" << std::endl;
                exit(EXIT_FAILURE);
            }
        } else if (std::isdigit(c))
        {
            buf.push_back(c);
            i++;
            while (std::isdigit(str.at(i)))
            {
                buf.push_back(str.at(i));
                i++;
            }
            i--;
            tokens.push_back({.type = TokenType::int_lit, .value = buf});
            buf.clear();
        } else if (c == ';')
        {
            tokens.push_back({.type = TokenType::semi});
        } else if (std::isspace(c))
        {
            continue;
        } else
        {
            std::cerr << "You messed up!" << std::endl;
            exit(EXIT_FAILURE);
        }
    }

    return tokens;
}

std::string tokens_to_asm(const std::vector<Token>& tokens)
{
    std::stringstream output;
    output << "global _start\n_start:\n";
    for (int i = 0; i < tokens.size(); i++)
    {
        const Token& token = tokens.at(i);
        if (token.type == TokenType::_return)
        {
            if (i + 1 < tokens.size() && tokens.at(i + 1).type == TokenType::int_lit)
            {
                if (i + 2 < tokens.size() && tokens.at(i + 2).type == TokenType::semi)
                {
                    output << "    mov rax, 60\n";
                    output << "    mov rdi, " << tokens.at(i + 1).value.value() << "\n";
                    output << "    syscall";
                }
            }
        }
    }
    return output.str();
}

int main(int argc, char* argv[])
{
    if (argc != 2)
    {
        std::cerr << "Incorrect usage. Correct usage is..." << std::endl;
        std::cerr << "hydro <input.hy>" << std::endl;
        return EXIT_FAILURE;
    }

    std::string contents;
    {
        std::stringstream contents_stream;
        std::fstream input(argv[1], std::ios::in);
        contents_stream << input.rdbuf();
        contents = contents_stream.str();
    }

    std::vector<Token> tokens = tokenize(contents);
    {
        std::fstream file("out.asm", std::ios::out);
        file << tokens_to_asm(tokens);
    }

    system("nasm -felf64 out.asm");
    system("ld -o out out.o");

    return EXIT_SUCCESS;
}
```

</details>






---
### Reference 
- [Youtube](https://youtu.be/vcSijrRsrY0)
- [Youtube Part 2](https://youtu.be/pupdmHjzrTI)
- [Github](https://github.com/orosmatthew/hydrogen-cpp)
