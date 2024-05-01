import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(":rut")
  async getHello(@Param("rut") rut: string): Promise<string> {
    try {

      console.log('rut', rut)
      const Sleep = (seconds: number) => new Promise((r) => setTimeout(r, seconds));



      const chromium = require('chrome-aws-lambda');
      const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });
      let page = await browser.newPage();

      await page.goto('https://muisca.dian.gov.co/WebRutMuisca/DefConsultaEstadoRUT.faces', {
        timeout: 0,
        waitUntil: 'networkidle2'
      });

      const INPUT_ID = 'input[id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:numNit"]'



      const getRut = async (r) => {
        return new Promise((resolve, reject) => {
          page.focus(INPUT_ID);

          resolve(true)
        })

      }



      await Promise.all([
        page.waitForNavigation(),
        page.$eval('input[id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:numNit"]', (el, value) => el.value = value, rut),
        page.click('input[id="vistaConsultaEstadoRUT:formConsultaEstadoRUT:btnBuscar"]')
      ]);
      await Sleep(3)
      let result = "0"
      result = await page.evaluate(() => {
        const anchor = document.getElementById('vistaConsultaEstadoRUT:formConsultaEstadoRUT:razonSocial');
        console.log('anchor', anchor)
        console.log('anchor.textContent', anchor.textContent);
        return anchor.textContent
      })


      await browser.close();

      return result;
    } catch (error) {
      return error.message
    }
  }
}
