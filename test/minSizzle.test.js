 var fs = require("fs");
 var path = require('path');
 var minSizzleSourceCode = fs.readFileSync(path.resolve(__dirname, '../src/minSizzle.js'), "utf-8");
 var expect = require('chai').expect;
 // jsdom
 var jsdom = require("jsdom").jsdom;
 var document = jsdom(`  <input type="text" class="js-input" placeholder=".js-input">
                <div id="js-id" class="js-class">
                    <ul class="js-ul">
                        <li>
                            <p>div#js-id.js-class ul.js-ul li p</p>
                        </li>
                        <li>
                            <p>div#js-id.js-class ul.js-ul li p</p>
                        </li>
                        <li>
                            <p>div#js-id.js-class ul.js-ul li p</p>
                        </li>
                    </ul>
                </div>
                <script src>
                ` + minSizzleSourceCode + `    
                </script>
                `);
 var window = document.defaultView;
 // console.log(window.toString())
 // console.log(window.document.documentElement)
 // console.log(window.document.documentElement.outerHTML);
 // output: "<html><head></head><body>hello world</body></html>"
 // console.log(window.innerWidth);
 // output: 1024
 // console.log(typeof window.document.getElementsByClassName);
 // outputs: function   
 describe('minSizzle', function () {
     it('minSizzle是一个函数', function () {
         expect(window.minSizzle).to.not.throw();
     });
     it('测试 minSizzle(window.document)', function () {
         expect(window.minSizzle(window.document).documentElement.outerHTML).to.be.equal(window.document.documentElement.outerHTML);
     });
     it('测试 minSizzle("#js-id")', function () {
         expect(window.minSizzle("#js-id").getAttribute("id")).to.be.equal("js-id");
     });
     it('测试 minSizzle(".js-input")[0]', function () {
         expect(window.minSizzle(".js-input")[0].getAttribute("class")).to.be.equal("js-input");
     });
     //其他复杂测试TODO
 });