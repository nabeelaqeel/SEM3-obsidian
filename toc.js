// initially from AlanG (https://forum.obsidian.md/t/new-maintainer-needed-for-dynamic-toc/42381/4)
// 2024/05/02, Sourigna: Added support for links within headers

// Set this to 1 if you want to include level 1 headers,
// or set it to 2 if you want to ignore level 1 headers
const startAtLevel = 1;
const content = await dv.io.load(dv.current().file.path);
const toc = content.match(new RegExp(`^#{${startAtLevel},} \\S.*`, 'mg'))
  .map(heading => {
    var [_, level, text] = heading.match(/^(#+) (.+)$/);
    
    // Transform links that are inside `text` as their displayed text only ([[my link|displayed text]] => displayed text)
    var displayed_text = text;
    displayed_text = displayed_text.replace(/\[\[([^\|\[\]]+)\|([^\|\[\]]+)\]\]/g, `$2`);
    displayed_text = displayed_text.replace(/\[\[([^\|\[\]]+)\]\]/g, "$1");

    // Obsidian strips links characters ("[", "|" and "]") that are within headers
    // e.g.     ## my header [[lvl2|level 2]]
    // becomes  [my_file#my header lvl2 level 2]
    // For the sake of readability, let's keep only the displayed texts:
    //          [my_file#my header lvl2 level 2|my header level 2]
    text = text.replace(/([\[\]])/g, "");
    text = text.replace(/([\|])/g, " ");
    const link = dv.current().file.path + '#' + text;
    const result = '\t'.repeat(level.length - startAtLevel) + `1. [[${link}|${displayed_text}]]`;
    
    return result;
  });
dv.header(2, 'Table of contents');
dv.paragraph(toc.join('\n'));