// 第三方API服务配置
// 请根据您的需求修改以下配置

const CONFIG = {
    // 基础配置
    SITE_NAME: '南京元X科技有限公司的离谱操作',
    SITE_DESCRIPTION: '真相曝光 • 正义发声 • 警示他人',
    
    // API服务配置
    API: {
        // 点赞系统API
        LIKE: {
            ENABLED: true,
            // 选择以下任一服务
            SERVICE: 'firebase', // 'firebase', 'leancloud', 'custom'
            
            // Firebase配置
            FIREBASE: {
                apiKey: "your-api-key",
                authDomain: "your-project.firebaseapp.com",
                projectId: "your-project-id",
                storageBucket: "your-project.appspot.com",
                messagingSenderId: "123456789",
                appId: "your-app-id"
            },
            
            // LeanCloud配置
            LEANCLOUD: {
                appId: "your-app-id",
                appKey: "your-app-key",
                serverURL: "https://your-server-url"
            },
            
            // 自定义API配置
            CUSTOM: {
                baseUrl: "https://your-api-domain.com",
                endpoints: {
                    like: "/api/likes",
                    unlike: "/api/likes",
                    count: "/api/likes/count"
                }
            }
        },
        
        // 评论系统API
        COMMENT: {
            ENABLED: true,
            // 选择以下任一服务
            SERVICE: 'disqus', // 'disqus', 'commento', 'gitalk', 'utterances', 'custom'
            
            // Disqus配置
            DISQUS: {
                shortname: "your-disqus-shortname",
                url: "https://your-site.com",
                identifier: "company-exposure"
            },
            
            // Commento配置
            COMMENTO: {
                url: "https://commento.your-domain.com",
                siteId: "your-site-id"
            },
            
            // Gitalk配置
            GITALK: {
                clientID: "your-github-client-id",
                clientSecret: "your-github-client-secret",
                repo: "your-github-repo",
                owner: "your-github-username",
                admin: ["your-github-username"],
                id: "company-exposure"
            },
            
            // Utterances配置
            UTTERANCES: {
                repo: "your-github-username/your-repo",
                issueTerm: "pathname",
                theme: "github-light"
            },
            
            // 自定义评论API配置
            CUSTOM: {
                baseUrl: "https://your-api-domain.com",
                endpoints: {
                    list: "/api/comments",
                    create: "/api/comments",
                    delete: "/api/comments"
                }
            }
        },
        
        // 统计系统API
        ANALYTICS: {
            ENABLED: true,
            // 选择以下任一服务
            SERVICE: 'google', // 'google', 'baidu', 'custom'
            
            // Google Analytics配置
            GOOGLE: {
                trackingId: "GA_TRACKING_ID"
            },
            
            // 百度统计配置
            BAIDU: {
                siteId: "your-baidu-site-id"
            },
            
            // 自定义统计API配置
            CUSTOM: {
                baseUrl: "https://your-api-domain.com",
                endpoints: {
                    pageview: "/api/analytics/pageview",
                    event: "/api/analytics/event"
                }
            }
        }
    },
    
    // 页面配置
    PAGE: {
        // 自动刷新间隔（毫秒），0表示不自动刷新
        AUTO_REFRESH: 0,
        
        // 本地存储过期时间（天）
        STORAGE_EXPIRE_DAYS: 7,
        
        // 评论最大长度
        MAX_COMMENT_LENGTH: 500,
        
        // 防刷配置
        ANTI_SPAM: {
            // 点赞间隔限制（毫秒）
            LIKE_INTERVAL: 1000,
            // 评论间隔限制（毫秒）
            COMMENT_INTERVAL: 5000,
            // 最大点赞次数（每小时）
            MAX_LIKES_PER_HOUR: 10,
            // 最大评论次数（每小时）
            MAX_COMMENTS_PER_HOUR: 5
        }
    },
    
    // 主题配置
    THEME: {
        // 主色调
        PRIMARY_COLOR: '#e74c3c',
        // 辅助色
        SECONDARY_COLOR: '#f39c12',
        // 成功色
        SUCCESS_COLOR: '#4CAF50',
        // 错误色
        ERROR_COLOR: '#e74c3c',
        // 背景渐变色
        BACKGROUND_GRADIENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        // 头部渐变色
        HERO_GRADIENT: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
    },
    
    // 内容配置
    CONTENT: {
        // 公司信息
        COMPANY: {
            NAME: '南京元X科技有限公司',
            INDUSTRY: '科技',
            LOCATION: '南京'
        },
        
        // CTO信息
        CTO: {
            NAME: '张XX',
            POSITION: '技术总监 / 首席技术官',
            PREVIOUS_COMPANY: '某知名互联网公司'
        },
        
        // 事件配置
        EVENTS: [
            {
                title: '事件一：恶意拖欠员工工资',
                description: '公司以各种理由拖欠员工工资，最长拖欠时间达3个月。当员工要求发放工资时，公司以"资金周转困难"为由推脱，甚至威胁要开除讨薪员工。',
                date: '2024年1月',
                severity: 'high'
            },
            {
                title: '事件二：虚假招聘承诺',
                description: '招聘时承诺高薪福利，入职后发现实际薪资远低于承诺，且没有任何福利保障。公司以"试用期"为由克扣工资，试用期结束后又以各种理由拒绝转正。',
                date: '2024年2月',
                severity: 'high'
            },
            {
                title: '事件三：强制加班无补偿',
                description: '公司强制员工996工作制，每天工作12小时以上，周末也要加班。但从未支付任何加班费，甚至威胁员工如果不配合加班就扣工资。',
                date: '2024年3月',
                severity: 'medium'
            },
            {
                title: '事件四：恶意解雇员工',
                description: '公司以"业务调整"为由大规模裁员，但拒绝支付任何补偿金。被解雇的员工要求合理补偿时，公司以各种理由推脱，甚至威胁要起诉员工。',
                date: '2024年4月',
                severity: 'high'
            },
            {
                title: '事件五：虚假宣传欺骗客户',
                description: '公司对外宣传拥有强大的技术团队和丰富的项目经验，实际交付的产品质量极差，经常出现严重bug，且售后服务态度恶劣。',
                date: '2024年5月',
                severity: 'medium'
            }
        ]
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
