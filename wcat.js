let fs = require("fs")
let inputArr = process.argv.slice(2);
let filesArr = [];
let optionArr = []
for(let i=0; i<inputArr.length; i++)
{
    let firstChar = inputArr[i].charAt(0);
    if(firstChar=="-")
    {
        optionArr.push(inputArr[i])
    }
    else
    {
        filesArr.push(inputArr[i]);
    }
}
for(let i=0; i<filesArr.length; i++)
{
    let ans = (fs.existsSync(filesArr[i]));
    if (ans==false)
    {
        console.log("Files does not exist")
        return;
    }
}

let content =""
for(let i=0; i<filesArr.length; i++)
{
    content = content + fs.readFileSync(filesArr[i]) ;
}
let contentArr = content.split("\r\n");

let  isSPresent = optionArr.includes("-s");

if(isSPresent)
{
    for(let i=0; i<contentArr.length;i++)
    {
        if (contentArr[i]=="" && contentArr[i-1]=="")
        {
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null)
        {
            contentArr[i]=null;
        }
    }
    let tempArr = [];
    for(let i=0; i<contentArr.length; i++)
    {
        if(contentArr[i] ==  null)
        {
            continue;
        }
        else
        {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}
//console.log(contentArr.join("\n"))
// checking for -n and -b

let indexofN = optionArr.indexOf("-n");
let indexofB = optionArr.indexOf("-b");
let finalOption ="";

if(indexofB>-1 && indexofN>-1)
{
    if(indexofN>indexofB)
    {
        finalOption = "-b";
    }
    else
    {
        finalOption = "-n";
    }
}
else
{
    if(indexofB>-1)
    {
        finalOption = "-b";
    }
    else if(indexofN>-1)
    {
        finalOption = "-n";
    }
}

if (finalOption != "")
{
    if(finalOption == "-n")
    {
        modifycontentforN(contentArr);
    }
   else if(finalOption =="-b")
    {
        modifycontentforB(contentArr);
    }
}

function modifycontentforN(contentArr)
{
    for(let i=0;i<contentArr.length;i++)
    {
        contentArr[i] = i+1 + "" + contentArr[i];
    }
}

function modifycontentforB(contentArr)
{
    let count = 1
    for(let i=0; i<contentArr.length;i++)
    {
        if (contentArr[i] != "")
        {
            contentArr[i] = count + " " + contentArr[i];
            count++;
        }
    }
}
console.log(contentArr.join("\r\n"));