var HelpTrick = {
  template: '\
    <div class="help-trick">\
      <mdui-header title="解题技巧">\
        <template slot="drawer">\
          <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white" @click="goBack">\
            <i class="mdui-icon material-icons">&#xe5c4;</i>\
          </a>\
        </template>\
      </mdui-header>\
      <div class="help-trick">\
        <p class="mdui-m-a-2 mdui-typo-body-1">以下我们将叙述一道标准数独的全部解题过程，在此过程中涉及到的技巧有摒除法、余数法、区块法、数对法、X-Wing这几个常在数独书籍中会涉及到的技巧。</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">谜题如下图:</p>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0aWR.png" alt="ix0aWR.png" border="0" />\
        </div>\
        <h2 class="mdui-typo mdui-m-a-2">摒除法 (Hidden Single)</h2>\
        <div class="mdui-divider"></div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">大家之前已阅读过数独的规则：在每个单元中，每个数字只能出现一次，那么也就意味着，如果一行已经出现了一个1，这行的其他格就不再有1，利用这个观点，引发出摒除法。</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第1步： 数字2对B1进行摒除</h5>\
          <ul class="mdui-m-l-2">\
            <li>r1c8为2，则其所在R1不再有2；</li>\
            <li>r2c4为2，则其所在R2不再有2；</li>\
            <li>r9c2为2，则其所在C2不再有2。</li>\
          </ul>\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">在B1中还没有2，B1有6个空格可以填2，但其中5个空格被摒除了，只剩下r3c1，所以得到第一解：r3c1=2。</p>\
        <div class="mdui-m-a-1">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix02Yd.png" alt="ix02Yd.png" border="0" style="transform:scale(0.9)"/>\
        </div>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第2步：r1c3=7（宫摒余解，数字7对B1摒除）</h5>\
          <h5 class="mdui-m-a-2">第3步：r4c7=7（宫摒余解，数字7对B6摒除）</h5>\
          <h5 class="mdui-m-a-2">第4步：数字7对C5进行摒除</h5>\
        </div>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0hlt.png" alt="ix0hlt.png" border="0" />\
        </div>\
        <ul>\
          <li>r1c3为7；则其所在R1不再有7；</li>\
          <li>r2c9为7，则其所在R2不再有7；</li>\
          <li>r4c7为7，则其所在R4不再有7；</li>\
          <li>r6c2为7，则其所在R6不再有7；</li>\
          <li>r8c1为7，则其所在R8不再有7；</li>\
          <li>r9c8为7，则其所在R9不再有7。</li>\
        </ul>\
        <p class="mdui-m-a-2 mdui-typo-body-1">在C5中还没有7，C5有7个空格可以填7，但其中6个空格不能为7了，所以天元格r5c5=7</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">这个方法因为是对列实施摒除的，所以叫列摒除法，与其类似的还有行摒除法。行列摒除法也是很常用的方法。</p>\
        <h2 class="mdui-typo mdui-m-a-2">余数法 (Naked Single)</h2>\
        <div class="mdui-divider"></div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">前面我们提到，一格受其所在单元中其他20格的牵制，假如这20格里面已经出现了1-8这8个数字，我们就可以断定这格一定是未出现的唯一数字9。</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第5步：点算r7c8的等位群格位已出现的数字</h5>\
        </div>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0seO.png" alt="ix0seO.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">r7c8处于R7、C8、B9，我们来点算一下已经出现过的有哪些数字：r1c8=2；r4c8=6；r6c8=9；r7c3=5；r7c5=8；r7c7=3；r8c9=4；r9c8=7，只有一个数字1没有出现，所以得到r7c8=1</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">这个方法很容易，几乎每个人一学就会，但是观察却极度的困难，必须多加练习才能掌握它的诀窍</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">再次陷入僵局，盘面上找不到摒除解和余数解了</p>\
        <h2 class="mdui-typo mdui-m-a-2">四角对角线法则 (X-Wing)</h2>\
        <div class="mdui-divider"></div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">听名字是不是完全不知道是什么？还是用题目来看。</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第6步：先找到X-Wing，再使用余数法</h5>\
        </div>\
        <ul>\
          <li>第1手：数字5对R2、R8摒除，出现X-Wing结构</li>\
        </ul>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0DOK.png" alt="ix0DOK.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">首先来看R2,因为r1c2为5，同处于B1的r2c2和r2c3不能为5；r5c7为5，所以同处C7的r2c7不能为5</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">再看R8，因为r7c3为5，同处于B7的r8c2和r8c3不能为5；r5c7为5，所以同处于C7的r8c7不能为5</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">5在R2有两种位置可以填，当填在r2c5时，则r2c8，r8c5不能为5，因此r8c8=5</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">情形若是如此，则C5，C8打×格均不能为5</p>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0By6.png" alt="ix0By6.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">当5填在r2c8时，r2c5，r8c5不能为5，因此r8c5=5</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">情形若是如此，则C5，C8打×格均不能为5</p>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0ywD.png" alt="ix0ywD.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">可见不论是哪种情况，C5和C8除这4格以外（也就是上述两种情况的交集）不能再有5。这就是X-Wing的删减逻辑。</p>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix06Te.png" alt="ix06Te.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">这手请记住删除了r3c8的5。</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">X-Wing是一个较难的进阶技巧，在进阶技巧中相对于后面我们会提到的区块、数对发生的几率小的多，但我们也要学会如何使用它。</p>\
        <ul>\
          <li>第2手：点算r3c8的等位群格位已出现的数字</li>\
        </ul>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0fSI.png" alt="ix0fSI.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">r1c8=2；r2c9=7；r3c3=8；r3c5=3；r3c7=1；r4c8=6；r6c8=9，加上之前的X-Wing排除了5的可能，所以得到r3c8=4</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第7步：r6c7=4（宫摒余解，数字4对B6摒除）</h5>\
        </div>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0RfA.png" alt="ix0RfA.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">在这里如果我们用2对C7摒除，可以得到摒余解r8c7=2，但可能这个观察范围过大，摒除的两个数字一个在r1c8，一个在r9c2，看起来很困难，但是我们可以利用下面介绍的区块摒除法架起一条桥梁，使观察变的容易一些。</p>\
        <h2 class="mdui-typo mdui-m-a-2">区块摒除法 (Locked Candidates)</h2>\
        <p class="mdui-m-a-2 mdui-typo-body-1">在利用摒除的时候，可能最后发现一个单元里面还剩不止一个格子为某个数，看似没什么用，其实不然，假设B1的1在r1c1或者r1c2，虽然我们不知道哪个是哪个，但是R1的其他空格不是就不能为1了么？</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第8步：利用区块的观点来观察r8c7为何是2</h5>\
        </div>\
        <ul>\
          <li>第1手：数字2对B6摒除</li>\
        </ul>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix046P.png" alt="ix046P.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">得到B6的2在r4c9，r5c9，r6c9之中</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">r4c9，r5c9，r6c9是 B6和C9 的交集，我们称数字2形成区块</p>\
        <ul>\
          <li>第2手：数字2对B9摒除</li>\
        </ul>\
        <p class="mdui-m-a-2 mdui-typo-body-1">由于B6的2在r4c9，r5c9，r6c9之中，即C9的2在B6当中，对B9摒除后得到摒余解r8c7=2</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">读者们可以尝试下如果第4步用区块看会有什么效果。当您熟练地运用区块摒除法时就像一座桥梁，把一些本来距离很远，相对难观察的数字联系起来，当然这就需要记忆了。</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第9步：r7c6=2（宫摒余解，数字2对B8摒除）</h5>\
          <h5 class="mdui-m-a-2">第10步：r7c4=7（宫摒余解，数字7对B8摒除）</h5>\
          <h5 class="mdui-m-a-2">第11步：r3c6=7（宫摒余解，数字7对B7摒除）</h5>\
          <h5 class="mdui-m-a-2">第12步：r5c9=2（行摒余解，数字2对R5摒除）</h5>\
          <h5 class="mdui-m-a-2">第13步：r6c9=1（宫摒余解，数字1对B6摒除）</h5>\
          <h5 class="mdui-m-a-2">第14步：r5c4=1（宫摒余解，数字1对B5摒除）</h5>\
          <h5 class="mdui-m-a-2">第15步：r7c2=4（行摒余解，数字4对R7摒除）</h5>\
          <h5 class="mdui-m-a-2">第16步：r4c3=4（宫摒余解，数字4对B4摒除）</h5>\
          <h5 class="mdui-m-a-2">第17步：r6c3=2（宫摒余解，数字2对B4摒除）</h5>\
          <h5 class="mdui-m-a-2">第18步：r5c6=4（宫摒余解，数字4对B5摒除）</h5>\
          <h5 class="mdui-m-a-2">第19步：r4c5=2（宫摒余解，数字2对B5摒除）</h5>\
          <h5 class="mdui-m-a-2">第20步：r4c6=9（宫摒余解，数字9对B5摒除）</h5>\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">当一个单元里面某两个数A和B只能在某2个格子的时候，该单元中其他格就不能再有这两个数字了，这就是数对法，听起来有点玄乎，用这道题来看就容易了。</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第21步：先找出数对，然后利用数对的占位进行摒除。</h5>\
        </div>\
        <ul>\
          <li>第1手：数字1，9对B2摒除</li>\
        </ul>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix05Of.png" alt="ix05Of.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">这时我们需要同时用两个数字来摒除，r5c4与r8c6的1对B2摒除得到1在r1c5或r2c5；r8c4与r4c6的9对B2摒除得到9也在r1c5或r2c5，所以B2的1和9占据了r1c5和r2c5这两个位置。</p>\
        <h2 class="mdui-typo mdui-m-a-2">数对法 (Pairs)</h2>\
        <div class="mdui-divider"></div>\
        <ul>\
          <li>第2手：数字4对B2摒除</li>\
        </ul>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0om8.png" alt="ix0om8.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">数字4对B2摒除后，还有2个空格可填4，但数对占用了2个空格的1个（r1c5），只剩下一个空格r1c4，所以得到r1c4=4</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第22步：r1c6=8（宫摒余解，数字8对B2摒除）</h5>\
          <h5 class="mdui-m-a-2">第23步：r3c4=5（唯余解）</h5>\
          <h5 class="mdui-m-a-2">第24步：r2c8=5（宫摒余解，数字5对B3摒除）</h5>\
          <h5 class="mdui-m-a-2">第25步：r9c9=5（宫摒余解，数字5对B9摒除）</h5>\
          <h5 class="mdui-m-a-2">第26步：r8c5=5（宫摒余解，数字5对B8摒除）</h5>\
          <h5 class="mdui-m-a-2">第27步：r6c6=5（宫摒余解，数字5对B5摒除）</h5>\
        </div>\
        <h2 class="mdui-typo mdui-m-a-2">唯一数 (Last Value)</h2>\
        <div class="mdui-divider"></div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">当某个单元中8格都被解出，则剩下的那个一定是未出现的第9个数字了，这就是第六招：唯一数。唯一数是唯余的特例，因为它只要观察一个单元，所以观察容易多了。</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第28步：第28步：观察C6</h5>\
        </div>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix0T0S.png" alt="ix0T0S.png" border="0" />\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">C6还剩一格没填数字，只有3还没出现，所以r9c6=3。</p>\
        <p class="mdui-m-a-2 mdui-typo-body-1">唯一数可谓是最容易理解的招数了，所以当有唯一数出现的时候，读者千万别忽略它哦！</p>\
        <div class="mdui-typo">\
          <h5 class="mdui-m-a-2">第29步：r9c5=4（宫摒余解，数字4对B8摒除）</h5>\
          <h5 class="mdui-m-a-2">第30步：r9c4=6（B8唯一数）</h5>\
          <h5 class="mdui-m-a-2">第31步：r6c5=6（宫摒余解，数字6对B5摒除）</h5>\
          <h5 class="mdui-m-a-2">第32步：r1c9=3（宫摒余解，数字3对B3摒除）</h5>\
          <h5 class="mdui-m-a-2">第33步：r5c8=3（宫摒余解，数字3对B6摒除）</h5>\
          <h5 class="mdui-m-a-2">第34步：r4c9=8（B6唯一数）</h5>\
          <h5 class="mdui-m-a-2">第35步：r8c8=8（C8唯一数）</h5>\
          <h5 class="mdui-m-a-2">第36步：r6c4=8（宫摒余解，数字8对B5摒除）</h5>\
          <h5 class="mdui-m-a-2">第37步：r6c4=8（B5唯一数）</h5>\
          <h5 class="mdui-m-a-2">第38步：r4c1=5（R4唯一数）</h5>\
          <h5 class="mdui-m-a-2">第39步：r6c1=3（R6唯一数）</h5>\
          <h5 class="mdui-m-a-2">第40步：r2c7=8（数字8对B3摒除）</h5>\
          <h5 class="mdui-m-a-2">第41步：r9c1=8（数字8对B7摒除）</h5>\
          <h5 class="mdui-m-a-2">第42步：r5c2=8（数字8对B4摒除）</h5>\
          <h5 class="mdui-m-a-2">第43步：r5c1=6（B4唯一数）</h5>\
          <h5 class="mdui-m-a-2">第44步：r3c2=6（宫摒余解，数字6对B1摒除）</h5>\
          <h5 class="mdui-m-a-2">第45步：r3c9=9（R3唯一数）</h5>\
          <h5 class="mdui-m-a-2">第46步：r1c7=6（B3唯一数）</h5>\
          <h5 class="mdui-m-a-2">第47步：r7c9=6（C9唯一数）</h5>\
          <h5 class="mdui-m-a-2">第48步：r9c7=9（B9唯一数）</h5>\
          <h5 class="mdui-m-a-2">第49步：r9c3=1（R9唯一数）</h5>\
          <h5 class="mdui-m-a-2">第50步：r7c1=9（R7唯一数）</h5>\
          <h5 class="mdui-m-a-2">第51步：r1c1=1（C1唯一数）</h5>\
          <h5 class="mdui-m-a-2">第52步：r1c5=9（R1唯一数）</h5>\
          <h5 class="mdui-m-a-2">第53步：r2c5=1（R2唯一数）</h5>\
          <h5 class="mdui-m-a-2">第54步：r2c2=9（宫摒余解，数字9对B1摒除）</h5>\
          <h5 class="mdui-m-a-2">第55步：r2c3=3（B1唯一数）</h5>\
          <h5 class="mdui-m-a-2">第56步：r8c2=3（C2唯一数）</h5>\
          <h5 class="mdui-m-a-2">第57步：r8c3=6（B7唯一数）</h5>\
        </div>\
        <p class="mdui-m-a-2 mdui-typo-body-1">完成</p>\
        <div class="mdui-m-a-3">\
          <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/16/ix07Tg.png" alt="ix07Tg.png" border="0" />\
        </div>\
      </div>\
    </div>\
  ',
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}