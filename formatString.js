function formatString(str, obj = { }) {
    let formatted = str || "";

    // {}: Variable
    formatted = formatted.replace(/\\?(?<!@){(.+?)}/g, (match, value) => {
        if (match.startsWith("\\")) return match.replace("\\", "");
        return value.split(".").reduce((acc, curr) => acc?.[curr], obj);
    });

    // @{}: Eval with variables
    formatted = formatted.replace(/\\?@{(.+?)}/g, (match, value) => {
        if (match.startsWith("\\")) return match.replace("\\", "");
        try {
            return eval(`${Object.entries(obj).map(i => `let ${i[0]} = ${JSON.stringify(i[1])};`).join("")}${value}`);
        } catch (err) {
            return;
        }
    });
    return formatted;
}

module.exports = formatString;