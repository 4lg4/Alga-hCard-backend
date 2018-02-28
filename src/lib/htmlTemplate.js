/**
 * Created by www.Alga.me on 28/2/18.
 */

export default ({ content }) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Live hCard Preview</title>
        
            <link href="css/bootstrap.min.css" rel="stylesheet" >
            <link href="css/main.css" rel="stylesheet">
        </head>
        
        <body>
            <div class="HcardApp" />
        
            <script src="https://unpkg.com/react@15/dist/react.js"></script>
            <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
            <script src="main.js"></script>
            
            ${content}
            
            <script>
                var hCardProps = ${hCardProps};
                console.log('hCardProps', hCardProps);
        
                (function() {
                    ReactDOM.render(
                        React.createElement(
                            window.hCard.default,
                            hCardProps
                        ),
                        document.querySelector('.HcardApp')
                    );
                })();
            </script>
        </body>
        </html>
  `;
};
