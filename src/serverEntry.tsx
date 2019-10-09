import {
  // tslint:disable-line ordered-imports
  createKoaServer,
  getScriptLocation,
} from '@hedviginsurance/web-survival-kit'
import * as Koa from 'koa'
import * as proxy from 'koa-server-http-proxy'
import * as path from 'path'
import { reactPageRoutes } from 'routes/routes'
import 'source-map-support/register'
import * as tls from 'tls'
import * as url from 'url'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})
const template = () => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hedvig H.OPE.</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.1/css/all.css"
        crossorigin="anonymous">
  <script src="https://cdn.ravenjs.com/3.22.3/raven.min.js"
          crossorigin="anonymous"></script>
  <style>
  body {
    overflow-x: visible;
  }
</style>
</head>
<body>
  <div id="react-root"></div>

  <script src="${scriptLocation}"></script>
</body>
</html>
`

const getPage: Koa.Middleware = async (ctx) => {
  ctx.body = template()
}
const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 9000)

console.log(`Booting server on ${getPort()} 👢`) // tslint:disable-line no-console

const server = createKoaServer({
  publicPath: '/assets',
  assetLocation: __dirname + '/assets',
})

server.router.get('/', getPage)
reactPageRoutes.forEach((route) => {
  server.router.get(route.path, getPage)
})

server.app.use(
  proxy({
    target: process.env.API_URL,
    changeOrigin: true,
    ssl: {
      checkServerIdentity(host, cert) {
        tls.checkServerIdentity(url.parse(process.env.API_URL!).hostname!, cert)
      },
    },
    ws: true,
  }),
)

server.app.listen(getPort(), () => {
  console.log(`Server started 🚀 listening on port ${getPort()}`) // tslint:disable-line no-console
})
