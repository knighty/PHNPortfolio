const fonts = [
    `Bebas+Neue`,
    `K2D:wght@400;600`
]

export default `
<!DOCTYPE html>
<html lang="en">
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <meta name="theme-color" content="#7aab52">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        <link href="https://fonts.googleapis.com/css2?${fonts.map(font => `family=${font}`).join('&')}&display=swap" rel="stylesheet">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        
        <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
    </head>

    <body>
        <x-app>
            <x-header></x-header>
            <x-nav></x-nav>
        </x-app>
        <footer></footer>
        <x-jump-to-top></x-jump-to-top>
    </body>
</html>`