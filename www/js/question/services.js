angular.module('question-app.question.services', ['question-app.services'])

// This Factory provides API Calls
.factory('questionService', ['$http', '$q', 'APIFunctions', 'utility', function($http, $q, APIFunctions, utility) {
    var questions = [{
        "answerContent": "秒答是8点后新推出的一大免费功能。\n\n在介绍这个功能前，我们想先聊聊“为什么要做秒答”。\n怀着做“中国最好的在线经验分享平台”的愿景，8点后和她的用户们也在一起成长，我们也收到了很多来自用户的热心反馈：\n- 履历能很好地展现导师信息，但是似乎缺少了一点“生气”，我们需要展示出一个个更鲜活的导师；\n- 导师们非常希望有更多的机会和学员交流，但是没有合适的渠道；\n\n这些反馈带给我们很多的思考：我们希望有一个更加“轻”更加“快”的功能帮助实现导师和学员的对接，于是，“秒答”应运而生！\n\n大家可以把“秒答”理解为8点后的“知乎”，不过，它不止是“知乎”。\n\n我们致力于通过“秒答”打造一个更开放也更有效的经验分享氛围，每一个学员的问题都能够得到良好的解决。\n\n相信一定会有小伙伴接着问更多问题了，别着急，待我们一一解答。\n\n*“秒答”和知乎有什么不同？*\n答：在现阶段，“秒答”将聚焦在个人发展话题（比如技能、职场、学业等），我们将着重突出三大优势：\n1. “快”——所有问题24小时内给出答复\n2. “真”——基于8点后导师的实名认证政策，所有的回答都是基于真实的经验\n3. “准”——不求事无巨细，但求直击问题痛点\n这里这里你的问题不会石沉大海，这里你看不到抖机灵答案，这里你看不到臭袜子般的长篇大论，有的是快速、专业、有效！\n\n*如果是职场话题，“秒答”和“应届生”有何差别*\n答：应届生的答复往往来自于同辈毕业生或者没有太多经验的版主，而“秒答”的答主都是资深的职场精英！\n\n*秒答“收费”吗？*\n答：比之LinkedIn（领英）高昂的inmail费用，秒答是完全免费的！\n\n\n\n目前，秒答产品正在试运行阶段，我们欢迎每一位8友试用：任何吐槽都可以点击本答案的评论提出哦，有信必复是PM的美德！我的个人微信：alwenlu\n\n看完这么多介绍，你是不是也跃跃欲试想提个问呢？出门右上角，立刻提问吧！",
        "answerCreatedTS": 1426588555000,
        "answerId": "IAM-W-2015-03-17-CBA8D6EA",
        "closed": true,
        "content": "秒答是什么？",
        "createdTS": 1426577512000,
        "ownerId": "IAM-A-03-13-2015-8AA0D953",
        "ownerName": "呆呆唐",
        "anonymous": false,
        "published": true,
        "recommend": 1,
        "questionId": "IAM-Q-2015-03-17-A8074AA2",
        "replierId": "IAM-A-07-19-2014-9576CBEA",
        "replierName": "Alwen Lu",
        "title": "秒答是什么？",
        "tags": [
            "秒答",
            "8点后"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 5,
        "totalRanks": 9,
        "owner": {
            "id": "IAM-A-03-13-2015-8AA0D953",
            "name": "呆呆唐",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-d01955ca-08e1-4985-bd78-736a19cb6529.png",
            "headline": "学生",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-07-19-2014-9576CBEA",
            "name": "Alwen Lu",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-38d5f641-9198-4df7-a7ba-c75309018519.png",
            "headline": "8点后产品经理",
            "empty": false
        }
    }, {
        "answerContent": "不要为了创业而创业，如果你有很好的idea，靠谱的团队，清晰的规划，创业是水到渠成的。但互联网创业的难度和风险也意味着失败的概率极高，不建议在没准备的情况下就决定要创业。可以在科技媒体上（如36氪、YC）等多看多了解多想，与创业圈的人多接触，更多地了解互联网创业。没有拿到融资前用最低成本做出产品，把模式走通，低成本试错才是关键。祝你好运~",
        "answerCreatedTS": 1427965725000,
        "answerId": "A-2015-04-02-E471AD11-36B",
        "closed": true,
        "content": "咨询投行这种光鲜亮丽的行业的确吸引很多年轻人 pay很高 平台很高 人脉圈很强 名声好 之后跳槽也有好出路  但是与此同时中国的TMT行业也在蓬勃发展 无论是BAT还是各位创业达人都抢滩这个行业 试图做出一番大事业 再创高峰 在这种背景下 互联网泡沫的存在也提醒了很多PE VC毕竟创业炮灰还是属于大多数的     \r\n1.那么涉世未深的大学生如果要进行创业 如何才能不成为炮灰? \r\n2.如果涉及到门槛比较高的TMT行业的科技创新 不是科班出身的人如何快速提升自我并且接地气?\r\n3.没有拿到融资以前 怎样才能让公司运作得不那么困难?\r\nThx very much!",
        "createdTS": 1427962215000,
        "ownerId": "IAM-A-04-02-2015-4DF83BB9",
        "ownerName": "Gwyneth Zhou",
        "anonymous": false,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-04-02-86101397-35E",
        "replierId": "IAM-A-07-19-2014-B7BBD4C6",
        "replierName": "Kelly Lu",
        "title": "大学生如何在未进入professional service industry之前积累优质资源进行成功的科技创业?",
        "tags": [
            "创业",
            "咨询",
            "投行",
            "PE",
            "VC",
            "TMT"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 0,
        "owner": {
            "id": "IAM-A-04-02-2015-4DF83BB9",
            "name": "Gwyneth Zhou",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-07-19-2014-B7BBD4C6",
            "name": "Kelly Lu",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-1e5c1ef9-d8fe-4876-8465-23d9db424822.png",
            "headline": "Managing Director at Kelly Placement, CEO at CareerFrog",
            "empty": false
        }
    }, {
        "answerContent": "家庭的这个是可以这样的，公共的话，要分成学校，医院，酒店，电影院之类的公共场所类的马桶以及办公楼的马桶，加上其他（用２/8原则）。算的时候去掉不是马桶的占比，比如蹲式的。要考虑到农村和城市的占比是不一样的。",
        "answerCreatedTS": 1427859296000,
        "answerId": "A-2015-04-01-346790F9-2B3",
        "closed": true,
        "content": "突然想到这个问题，马桶指坐着的那种。然后我的思路是分为家用，公共厕所，和非家用（不包含公厕）。家庭我准备从family数量出发来计算，但是到了非家用这一块的时候，觉得有点计算不下去。以tier 1城市上海为例，我想分市区（静安，徐汇，虹口之类）和非市区（青浦，奉贤等）然后计算一个区马桶数量=一个区非住宅楼数量*平均层数*平均每层马桶数量。然后非市区打一个折扣，计算出上海的数量再推中国的数量。这个思路是不是可行？我在计算一个区非住宅楼数量时不知道怎么再break down下去，想求教下",
        "createdTS": 1427796746000,
        "ownerId": "IAM-A-03-24-2015-9B7D3B79",
        "ownerName": "Frank ",
        "anonymous": false,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-03-31-3EDC6F22-69C",
        "replierId": "IAM-A-07-19-2014-EB0C8EBB",
        "replierName": "Xiaolu(Gloria) Zhang",
        "title": "估算中国马桶的数量",
        "tags": [
            "咨询，market"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 3,
        "owner": {
            "id": "IAM-A-03-24-2015-9B7D3B79",
            "name": "Frank ",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-07-19-2014-EB0C8EBB",
            "name": "Xiaolu(Gloria) Zhang",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-7d1d3653-fd16-43cd-bcb6-6e771d65ead0.png",
            "headline": "Associate at L.E.K. Consulting",
            "empty": false
        }
    }, {
        "answerContent": "资产管理公司的监察部通常负责风险控制，准入和授权，审计和监管等。具体的工作内容包括：完善资产风险控制系统；统计分析投资业务数据，评估投资风险情况，进行业务风险预警；撰写和风险评估报表报告；风控数据的日常维护等。加入这个部门未来职业发展路径还是较为广阔的，你可以留在保险领域做风控经理或者项目经历，你也可以加入别的行业，比如最近比较热门的互联网金融，做资格审查。当然，因为这个部门的工作会培养较高的研究和分析能力，以后去咨询公司做咨询顾问，或者进入PE，VC做尽职调查也都是有可能的。",
        "answerCreatedTS": 1427859046000,
        "answerId": "A-2015-04-01-2B61FA46-184",
        "closed": true,
        "content": "保险公司的资产管理公司（AMC）的监察部（不同公司中可能称谓不同），日常工作内容是怎样的？未来职业发展路径是怎样的？",
        "createdTS": 1427810384000,
        "ownerId": "IAM-A-03-31-2015-44775D1D",
        "ownerName": "小胖",
        "anonymous": true,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-03-31-566A8196-798",
        "replierId": "IAM-A-07-26-2014-2C6829A8",
        "replierName": "Jimmy Zhou",
        "title": "保险资产管理公司的监察部是做什么工作的？",
        "tags": [
            "AMC",
            "职业"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 1,
        "owner": {
            "id": "IAM-A-03-31-2015-44775D1D",
            "name": "小胖",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-07-26-2014-2C6829A8",
            "name": "Jimmy Zhou",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-e1ec9e9f-0f6c-4dec-ab9b-0ce4c28d631a.png",
            "headline": "Associate at Morgan Stanley Huaxin Securities",
            "empty": false
        }
    }, {
        "answerContent": "1)看“基本面”，包括学历、学校档次、GPA、领导经历等；2) 看工作经历：一般来说，比较偏好500强企业或相关的professional services 公司，而且是市场/销售、供应链、战略/投资等与核心业务关系紧密的职位（hr就不行）；3) 面试过程中还是要看沟通能力、解决问题的能力等",
        "answerCreatedTS": 1427858831000,
        "answerId": "A-2015-04-01-A60F291B-771",
        "closed": true,
        "content": "如题",
        "createdTS": 1427793858000,
        "ownerId": "IAM-A-03-21-2015-0F6FC050",
        "ownerName": "GoGetThem ",
        "anonymous": false,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-03-31-31F94927-908",
        "replierId": "IAM-A-10-20-2014-09E85A9C",
        "replierName": "Yuzhi(Eddy) Yang",
        "title": "咨询公司对于已经有2-5年工作经验的求职者是怎样进行筛选的，看重的素质都有哪些？",
        "tags": [
            "咨询",
            "跳槽",
            "求职"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 1,
        "owner": {
            "id": "IAM-A-03-21-2015-0F6FC050",
            "name": "GoGetThem ",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-10-20-2014-09E85A9C",
            "name": "Yuzhi(Eddy) Yang",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-1850f4fb-96ea-4735-b5cb-c4574d486bb5.png",
            "headline": "Senior Consultant at Roland Berger",
            "empty": false
        }
    }, {
        "answerContent": "咨询公司的升职路径相对比较稳定，以Bain &Co为例，第一年和第二年是associate consultant(AC)，第三年是sr.AC。一般来说三年后许多人会选择出去读MBA，毕业回来之后是consultant，2年consultant之后升manager，mgr再升par没有特别固定的时间。\n升职的标准以consultant本身的performance为标准，只要rating在平均水平及以上，基本都能有升职的机会。\n基本上所有的投资银行也都有固定的职业阶梯，通常你的职业道路是这样的：\nAnalyst → Associate → Vice President (VP) → Senior Vice President (SVP) / Director → Managing Director (MD)\n少部分银行会将SVP和Director分作两个不同的职位，但除此以外也都相同。另外一些非美国投行会稍稍改一改各职位的名称，比如把VP称作Director然后把SVP称作Executive Director。不过换汤不换药，整个ladder是一样的。\n升职的标准依旧以staff本身的performance为标准，但是投行的竞争更为激烈，压力也更大一些，升职的不确定性更高，流动率也更高。",
        "answerCreatedTS": 1427775969000,
        "answerId": "A-2015-03-31-D8DA2963-881",
        "closed": true,
        "content": "想了解下咨询和投行这两个行业分别的职位升级所花时间？满足升职的条件有哪些衡量标准？\r\n",
        "createdTS": 1427698024000,
        "ownerId": "IAM-A-02-04-2015-9B8FBF3C",
        "ownerName": "cc ",
        "anonymous": true,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-03-30-2D019491-223",
        "replierId": "IAM-A-10-30-2014-F0FCA339",
        "replierName": "Wenting WU",
        "title": "咨询公司和投行的升职路径和大约所需时间？",
        "tags": [
            "咨询",
            "投行",
            "职业规划"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 3,
        "owner": {
            "id": "IAM-A-02-04-2015-9B8FBF3C",
            "name": "cc ",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-10-30-2014-F0FCA339",
            "name": "Wenting WU",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-8c0fe9e5-35ac-4263-a0d7-975e45f2cf9d.png",
            "headline": "Associate at The Boston Consulting Group",
            "empty": false
        }
    }, {
        "answerContent": "1，乘客付款后他们是周结或者月结给合作司机，所以会有很大一笔现金流可做资本运作。\n2，他们会向合作的专车师傅收车费的20%平台费。\n3，大量的行驶交通数据，高端用户数据的资源。\n4，借助平台特性，与相关行业合作。（如，积累了几万司机的平台，可以和车保养，洗车，租车，卖车等进行资源置换，广告等合作）\n因此目前基本上都还是不盈利的状态",
        "answerCreatedTS": 1427707647000,
        "answerId": "A-2015-03-30-71FD6378-BF4",
        "closed": true,
        "content": "滴滴与快的这种表面上看来特别烧钱的模式，靠什么盈利，并且获得那么高的估值？",
        "createdTS": 1427697000000,
        "ownerId": "IAM-A-03-21-2015-0F6FC050",
        "ownerName": "GoGetThem ",
        "anonymous": false,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-03-30-21D19859-15E",
        "replierId": "IAM-A-07-22-2014-9D912AD0",
        "replierName": "Jackie Mei",
        "title": "滴滴与快的这种表面上看特别烧钱的模式，靠什么盈利，并且获得那么高的估值？",
        "tags": [
            "互联网思维",
            "盈利模式"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 2,
        "owner": {
            "id": "IAM-A-03-21-2015-0F6FC050",
            "name": "GoGetThem ",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-07-22-2014-9D912AD0",
            "name": "Jackie Mei",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-c4326ebe-041d-4fe2-8676-35d2cfa8b200.png",
            "headline": "Global Management Trainee",
            "empty": false
        }
    }, {
        "answerContent": "职业发展路径：职业发展路径不是固定的，因为在GTB工作所积累的经验和技能没有那么专才。未来可以考虑的职业方向包括：Product Management, Global Corporates Sales, Client Access, Trade Advisor,以及Investors & Intermediaries Management。\n影响部门发展因素：银行业的每个部门都会受到银行业不景气的影响。但我认为这个部门受到银行业景气程度的影响比别的部门小，因为GTB的业务主要包括 Payments and cash management, Trade and Receivables Finance, Client Access，主要涉及客户的现金管理和贸易金融，所以这个部门更容易受到经济不景气和贸易增长缓慢等因素的影响。\n对申请MBA的帮助：GTB对于申请MBA还是很有利的。个人认为，申请MBA，学校首先会看工作平台。如果你是HSBC, CITI或者SC的GTS，这些平台申请MBA都会很有优势。其次，GTB主要关注企业的现金管理，这跟MBA的企业管理很贴近。另外，GTB工资提升潜力大，学校不会担心你MBA毕业之后拉低毕业生薪酬水平。",
        "answerCreatedTS": 1427707153000,
        "answerId": "A-2015-03-30-EC5155E7-7AB",
        "closed": true,
        "content": "请问大陆的外资银行交易银行部(Global transaction banking/service)员工的职业发展路径是怎么样的？未来这一部门的员工是否会收到中国银行业不景气（利率市场化，监管，互联网金融等因素）的影响？入职几年的员工申请北美top MBA的成功性有多大？（排除个人因素，基于从事的工作而言）。非常感谢！\r\n注：交易银行部一般主管公司的贸易融资和现金业务。",
        "createdTS": 1427548815000,
        "ownerId": "IAM-A-03-28-2015-8DC88689",
        "ownerName": "湛卢小人物",
        "anonymous": false,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-03-28-F16B0512-C60",
        "replierId": "IAM-A-07-26-2014-2C6829A8",
        "replierName": "Jimmy Zhou",
        "title": "关于大陆外资银行交易银行部(Global transaction banking)的职业发展",
        "tags": [
            "外资银行",
            "MBA",
            "交易银行"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 2,
        "owner": {
            "id": "IAM-A-03-28-2015-8DC88689",
            "name": "湛卢小人物",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-07-26-2014-2C6829A8",
            "name": "Jimmy Zhou",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-e1ec9e9f-0f6c-4dec-ab9b-0ce4c28d631a.png",
            "headline": "Associate at Morgan Stanley Huaxin Securities",
            "empty": false
        }
    }, {
        "answerContent": "我也是海龟，以前在总部在香港的外资银行工作，由于性格原因，不是很介意户口的性质，所以目前工作5年了，已经从外资辞职也依然没有去办理户口，并不后悔。但是每个人的情况还是要依据对自己将来的定位。 \n\n关于北京户口的优劣势，\n推荐一个网站：http://www.baike.com/z/tupian/Household/index.html\n还有一个报道：\nhttp://shehui.daqi.com/article/3505517.html\n\n目前来看，如果你在北京长期发展，北京户口的好处还是很多的，特别是从经济价值上横梁，从买房，读书，下一代等政策上，会省去一部分费用。\n\n所以这个问题就相当于你现在放弃的培训的机会成本问题。如果目前是金融机构中的高收入职位，那么这一年的培训价值无疑会很重要，而且你将来会有能力把非北京户口损失的cost弥补回来；假设目前是正常月薪10-20K之间，那么北京户口的价值无意会突出一些。况且这样职位的培训机会不知道是否将来可以再次争取。\n\n若有更多信息提供的话，欢迎与你再次讨论。",
        "answerCreatedTS": 1427638637000,
        "answerId": "A-2015-03-29-374732FA-802",
        "closed": true,
        "content": "留学生一枚，刚工作，从事金融工作。目前人刚来香港总部培训，一年后回北京公司发展。发现自己留学生身份和公司都有解决北京户口的资质，但是需要自己立刻结束香港培训回北京。请问为了北京户口，牺牲香港培训一年的机会值么?  北京户口真的那么重要么?作为刚工作的职场小白，看不明白户口的重要性。但自己打算以后在北京长期发展，看了很多资料，依然无法做出选择，希望过来人能给我些建议。",
        "createdTS": 1427556547000,
        "ownerId": "IAM-A-10-27-2014-EA429877",
        "ownerName": "Clairefly ",
        "anonymous": true,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-03-28-1063D0D8-3C0",
        "replierId": "IAM-A-07-20-2014-8AB62AE9",
        "replierName": "Adrian Teng",
        "title": "北京户口和在公司香港总部培训，哪个重要？ ",
        "tags": [
            "北京户口"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 1,
        "owner": {
            "id": "IAM-A-10-27-2014-EA429877",
            "name": "Clairefly ",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-07-20-2014-8AB62AE9",
            "name": "Adrian Teng",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-32ccfb01-f3b2-43b2-b88f-e701c08f831c.png",
            "headline": "Business Development Director at CareerFrog",
            "empty": false
        }
    }, {
        "answerContent": "问题1和2:部分公司会有补招，也有的公司会在较晚的时间开启校招，可以通过这些机会申请。 四大一般开始的较早，在大四学期开始时就开启校招了，如果没有网申的话，只能通过补招参与校招环节（当然前提是当年有补招）。问题3:一般来说应届生招聘只招收当年毕业的学生，其他的就走社招了。虽然会有个别公司说两年内毕业无工作经验可视为应届生，但在实际环节这部分人群是不占优势的。ps：既然目标明确为四大或银行，可以提早准备好他们的网申，提早每天准备一点点也不会占用很多时间。至于考研也提前准备，这样到校招开始的时候挤出一点时间来投四大或你心仪的银行，一共没几家也不会分散太多精力。pps：既然选择了考研就要有信心，就像《牧羊少年的奇幻之旅》中的一句话——当你全心全意梦想着什么的时候，整个宇宙都会协同起来，助你实现自己的心愿。",
        "answerCreatedTS": 1427458319000,
        "answerId": "A-2015-03-27-B3B4131E-184",
        "closed": true,
        "content": "我现在大三，准备考研，但是担心怕考不上工作不好找。工作方向想进四大或者商业银行。有些问题，第一，如果准备考研，没有申请毕业那年的fulltime是不是之后就不能申请了。第二，如果没有网申，之后还有什么机会可以进吗？有什么公开招聘的时间点吗？第三，四大和银行会不会把毕业2年之内的人都视作为招聘群体",
        "createdTS": 1427375248000,
        "ownerId": "IAM-A-03-24-2015-9B7D3B79",
        "ownerName": "Frank ",
        "anonymous": true,
        "published": true,
        "recommend": 0,
        "questionId": "Q-2015-03-26-C866C632-404",
        "replierId": "IAM-A-03-20-2015-2A4EAC4B",
        "replierName": "Lauren Feng",
        "title": "考研与校招",
        "tags": [
            "银行，四大"
        ],
        "status": "FINISHED",
        "finished": true,
        "totalComments": 0,
        "totalRanks": 1,
        "owner": {
            "id": "IAM-A-03-24-2015-9B7D3B79",
            "name": "Frank ",
            "avatarUrl": "",
            "headline": "",
            "empty": false
        },
        "replier": {
            "id": "IAM-A-03-20-2015-2A4EAC4B",
            "name": "Lauren Feng",
            "avatarUrl": "http://www.8dianhou.com/resources/images/avatar/avatar05.png",
            "headline": "Manager",
            "empty": false
        }
    }];

    return {
        questionOf: function(questionID) {
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].questionId === questionID) {
                    return questions[i];
                }
            }
            return null;
        },

        'getRecentQuestions': function() {
            return questions;
        }
    };
}]);
