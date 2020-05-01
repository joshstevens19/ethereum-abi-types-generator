const fs = require('fs');

fs.readFile('../README.md', function (err, buf) {
  if (err) console.log(err);
  let data = buf.toString();
  data = data.replace(
    '<img src="./images/gif-demo.gif" />',
    'Demo gif can be seen on the github readme'
  );
  console.log(data);

  fs.writeFile('./README.md', data, (err) => {
    if (err) console.log(err);
    console.log('Successfully Updated the readme.');
  });
});
