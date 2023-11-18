const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getWeather);
router.post('/', controller.addWeather);
router.get('/:city', controller.getWeatherByCity);
router.get('/:date', controller.getWeatherByDate)
router.delete('/:date', controller.removeWeather);
router.put('/:date/:city', controller.updateWeather)

module.exports = router;