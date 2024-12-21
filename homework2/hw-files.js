const textArray = ['text1.txt', 'text2.txt', 'text3.txt', 'text4.txt', 'text5.txt', 'text6.txt', 'text7.txt', 'text8.txt', 'text9.txt', 'text10.txt'];
// File System module required to read and write files
const fs = require('fs');
// The name of the final output file
const FinalFile = 'allTextfile.txt'
// Function to read a specific line (row) from a given file
function ReadXLinesFrom(filename,row) {
  // Read the content of the file 
  const text = fs.readFileSync(filename, 'utf8');
  // Split the file content into an array of lines using newline as the delimiter
  const line = text.split(/\r?\n/);
  // Return the line corresponding to the specified row
  const all = line[row];
  return all;
}
//empty string to store the combined content
let FinalAll = "";
// loop go through each file in the textArray
for (let i = 0; i < 9; i++) {
  //loop determines the number of lines to read based on the outer loop index
  for (let j = 0; j < i+1 ; j++)
   // take the specific line from the current file to FinalAll, followed by a newline
    FinalAll += ReadXLinesFrom('texts/'+textArray[i],j)+ "\n"
  }
// Write the combined content to the output file
fs.writeFile(FinalFile, FinalAll, (contacts)=>{
  if (contacts) {
    // Log an error message if there is an issue writing the file
    console.contacts('Error by writing into the File', contacts);
  }else {
    // Log a success message if the file was written successfully
    console.log('File was successfully made');
  }  
}); 
