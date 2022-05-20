export default class RootController {
  // [GET] /
  index = async (request, h) => h.view('root')
}
