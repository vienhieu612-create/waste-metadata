// 全局变量
let viewCount = 0;
let currentImageIndex = 0;
const totalImages = 15;
const images = [];

// API服务配置
const API_CONFIG = {
    // Netlify Functions API端点
    LOG_VIEW: '/.netlify/functions/log-view',
    GET_STATS: '/.netlify/functions/get-page-stats',
    GET_COMPANY_EVENTS: '/.netlify/functions/get-company-events',
    ADD_COMPANY_EVENT: '/.netlify/functions/add-company-event',
    GET_CTO_HISTORY: '/.netlify/functions/get-cto-history',
    ADD_CTO_HISTORY: '/.netlify/functions/add-cto-history',
    GET_COMMENTS: '/.netlify/functions/get-comments',
    ADD_COMMENT: '/.netlify/functions/add-comment'
};



// 设置事件监听器
function setupEventListeners() {
    // 滚动动画
    setupScrollAnimations();
    
    // 走马灯控制
    setupCarouselControls();
    
    // 图片查看器控制
    setupImageViewer();
}

// 设置滚动动画
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.event-card, .warning-quote, .carousel-container, .warning-item, .cto-card, .comment-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// 初始化走马灯
function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const thumbnailsContainer = document.getElementById('thumbnails');
    
    // 检查元素是否存在
    if (!carouselTrack || !thumbnailsContainer) {
        console.warn('走马灯元素不存在，跳过初始化');
        return;
    }
    
    // 生成图片列表
    for (let i = 1; i <= totalImages; i++) {
        const imagePath = `imgs/black/${i}.png`;
        images.push(imagePath);
        
        // 创建主图片
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${imagePath}" alt="CTO黑历史 ${i}" data-index="${i-1}">`;
        carouselTrack.appendChild(slide);
        
        // 创建缩略图
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.setAttribute('data-index', i-1);
        thumbnail.innerHTML = `<img src="${imagePath}" alt="缩略图 ${i}">`;
        thumbnailsContainer.appendChild(thumbnail);
    }
    
    // 设置初始状态
    updateCarousel();
    updateThumbnails();
}

// 设置走马灯控制
function setupCarouselControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // 检查元素是否存在
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            updateCarousel();
            updateThumbnails();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            updateCarousel();
            updateThumbnails();
        });
    }
    
    // 缩略图点击
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            currentImageIndex = parseInt(thumbnail.getAttribute('data-index'));
            updateCarousel();
            updateThumbnails();
        });
    });
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            updateCarousel();
            updateThumbnails();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            updateCarousel();
            updateThumbnails();
        } else if (e.key === 'Escape') {
            closeImageViewer();
        }
    });
}

// 设置图片查看器
function setupImageViewer() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const imageViewer = document.getElementById('imageViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerClose = document.getElementById('viewerClose');
    const viewerPrev = document.getElementById('viewerPrev');
    const viewerNext = document.getElementById('viewerNext');
    
    // 点击图片打开查看器
    carouselImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openImageViewer(index);
        });
        
        // 添加提示信息
        img.title = '点击放大查看';
    });
    
    // 关闭查看器
    if (viewerClose) {
        viewerClose.addEventListener('click', closeImageViewer);
    }
    
    if (imageViewer) {
        imageViewer.addEventListener('click', (e) => {
            if (e.target === imageViewer) {
                closeImageViewer();
            }
        });
    }
    
    // 查看器内切换图片
    if (viewerPrev) {
        viewerPrev.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止触发关闭
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            updateViewerImage();
            updateCarousel();
            updateThumbnails();
        });
    }
    
    if (viewerNext) {
        viewerNext.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止触发关闭
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            updateViewerImage();
            updateCarousel();
            updateThumbnails();
        });
    }
    
    // 防止图片点击事件冒泡
    if (viewerImage) {
        viewerImage.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// 更新走马灯
function updateCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const currentImage = document.getElementById('currentImage');
    
    // 移动轨道
    if (carouselTrack) {
        carouselTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }
    
    // 更新计数器
    if (currentImage) {
        currentImage.textContent = currentImageIndex + 1;
    }
}

// 更新缩略图
function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

// 打开图片查看器
function openImageViewer(index) {
    const imageViewer = document.getElementById('imageViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerCounter = document.getElementById('viewerCounter');
    
    if (!imageViewer || !viewerImage || !viewerCounter) {
        console.warn('图片查看器元素不存在');
        return;
    }
    
    currentImageIndex = index;
    viewerCounter.textContent = `${index + 1} / ${totalImages}`;
    imageViewer.classList.add('active');
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
    
    // 添加加载状态
    viewerImage.style.opacity = '0';
    viewerImage.onload = () => {
        viewerImage.style.opacity = '1';
    };
    viewerImage.src = images[index];
}

// 关闭图片查看器
function closeImageViewer() {
    const imageViewer = document.getElementById('imageViewer');
    if (imageViewer) {
        imageViewer.classList.remove('active');
        
        // 恢复背景滚动
        document.body.style.overflow = '';
    }
}

// 更新查看器图片
function updateViewerImage() {
    const viewerImage = document.getElementById('viewerImage');
    const viewerCounter = document.getElementById('viewerCounter');
    
    if (viewerImage) {
        viewerImage.src = images[currentImageIndex];
    }
    
    if (viewerCounter) {
        viewerCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
    }
}

// 更新阅读量
async function updateViewCount() {
    viewCount++;
    const viewCountElement = document.getElementById('viewCount');
    if (viewCountElement) {
        viewCountElement.textContent = viewCount;
    }
    
    // 发送到数据库API
    try {
        await logPageView();
        console.log('页面访问记录成功');
    } catch (error) {
        console.log('页面访问记录失败:', error);
    }
}

// 设置滚动动画
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.event-card, .warning-quote, .carousel-container, .warning-item, .cto-card, .comment-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 保存状态到本地存储
function saveState() {
    const state = {
        viewCount,
        currentImageIndex,
        timestamp: Date.now()
    };
    localStorage.setItem('exposurePageState', JSON.stringify(state));
}

// 从本地存储恢复状态
function restoreState() {
    const savedState = localStorage.getItem('exposurePageState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            
            // 检查状态是否过期（7天）
            const now = Date.now();
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            
            if (now - state.timestamp < sevenDays) {
                viewCount = state.viewCount || 0;
                currentImageIndex = state.currentImageIndex || 0;
                
                // 更新UI
                updateUIFromState();
            }
        } catch (error) {
            console.error('恢复状态失败:', error);
        }
    }
}

// 根据状态更新UI
function updateUIFromState() {
    const viewCountElement = document.getElementById('viewCount');
    if (viewCountElement) {
        viewCountElement.textContent = viewCount;
    }
    if (images.length > 0) {
        updateCarousel();
        updateThumbnails();
    }
}

// 加载初始数据
async function loadInitialData() {
    try {
        // 这里可以加载真实的初始数据
        console.log('页面数据加载完成');
    } catch (error) {
        console.log('加载初始数据失败:', error);
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // 根据类型设置背景色
    if (type === 'success') {
        notification.style.background = '#4CAF50';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else {
        notification.style.background = '#667eea';
    }
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 工具函数
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) { // 1分钟内
        return '刚刚';
    } else if (diff < 3600000) { // 1小时内
        return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) { // 1天内
        return `${Math.floor(diff / 3600000)}小时前`;
    } else {
        return date.toLocaleDateString('zh-CN');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// API调用函数
async function logPageView() {
    const response = await fetch(API_CONFIG.LOG_VIEW, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pageUrl: window.location.href,
            referrer: document.referrer
        })
    });
    
    if (!response.ok) {
        throw new Error('网络请求失败');
    }
    
    return await response.json();
}

async function getPageStats() {
    const response = await fetch(API_CONFIG.GET_STATS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (!response.ok) {
        throw new Error('网络请求失败');
    }
    
    return await response.json();
}

// 加载页面统计数据
async function loadPageStats() {
    try {
        const response = await getPageStats();
        if (response.success) {
            const { viewCount, eventCount } = response.data;
            
            // 更新阅读量
            const viewCountElement = document.getElementById('viewCount');
            if (viewCountElement) {
                viewCountElement.textContent = viewCount;
            }
            
            // 更新事件数量
            const eventCountElements = document.querySelectorAll('.stats .stat-item:nth-child(2) .stat-number');
            eventCountElements.forEach(element => {
                element.textContent = eventCount;
            });
            
            console.log('页面统计数据加载成功:', { viewCount, eventCount });
        } else {
            console.error('获取页面统计失败:', response.error);
        }
    } catch (error) {
        console.error('加载页面统计数据失败:', error);
    }
}

// 生成验证码
function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 生成数学验证码
function generateMathCaptcha(captchaId, answerId) {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let question, answer;
    switch(operator) {
        case '+':
            question = `${num1} + ${num2} = ?`;
            answer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2} = ?`;
            answer = num1 - num2;
            break;
        case '*':
            question = `${num1} × ${num2} = ?`;
            answer = num1 * num2;
            break;
    }
    
    const captchaElement = document.getElementById(captchaId);
    const answerElement = document.getElementById(answerId);
    
    if (captchaElement) {
        captchaElement.textContent = question;
    }
    if (answerElement) {
        answerElement.value = answer;
    }
}

// 获取公司事件列表
async function getCompanyEvents(page = 1, limit = 6) {
    const response = await fetch(`${API_CONFIG.GET_COMPANY_EVENTS}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (!response.ok) {
        throw new Error('网络请求失败');
    }
    
    return await response.json();
}

// 添加公司事件
async function addCompanyEvent(data) {
    const response = await fetch(API_CONFIG.ADD_COMPANY_EVENT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('网络请求失败');
    }
    
    return await response.json();
}

// 获取CTO黑历史列表
async function getCtoHistory(page = 1, limit = 6) {
    const response = await fetch(`${API_CONFIG.GET_CTO_HISTORY}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (!response.ok) {
        throw new Error('网络请求失败');
    }
    
    return await response.json();
}

// 添加CTO黑历史
async function addCtoHistory(data) {
    const response = await fetch(API_CONFIG.ADD_CTO_HISTORY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('网络请求失败');
    }
    
    return await response.json();
}

// 获取评论列表
async function getComments(page = 1, limit = 10) {
    const response = await fetch(`${API_CONFIG.GET_COMMENTS}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (!response.ok) {
        throw new Error('网络请求失败');
    }
    
    return await response.json();
}

// 添加评论
async function addComment(data) {
    const response = await fetch(API_CONFIG.ADD_COMMENT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('网络请求失败');
    }
    
    return await response.json();
}

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面重新可见时更新阅读量
        updateViewCount();
    }
});

// 错误处理
window.addEventListener('error', function(event) {
    console.error('页面错误:', event.error);
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的Promise拒绝:', event.reason);
});

// 全局变量
let currentEventsPage = 1;
let currentCtoPage = 1;
let currentCommentsPage = 1;
let eventCaptchaAnswer = '';
let ctoCaptchaAnswer = '';
let commentCaptchaAnswer = '';

// 加载公司事件
async function loadCompanyEvents(page = 1) {
    try {
        showLoading();
        const result = await getCompanyEvents(page, 6);
        if (result.success) {
            renderCompanyEvents(result.data.events);
            renderPagination('eventsPagination', result.data.pagination, loadCompanyEvents);
            currentEventsPage = page;
        } else {
            showError('加载公司事件失败');
        }
    } catch (error) {
        console.error('加载公司事件失败:', error);
        showError('加载公司事件失败');
    } finally {
        hideLoading();
    }
}

// 渲染公司事件
function renderCompanyEvents(events) {
    const container = document.getElementById('eventsGrid');
    if (!container) return;
    
    if (events.length === 0) {
        container.innerHTML = '<div class="no-data">暂无数据</div>';
        return;
    }
    
    container.innerHTML = events.map((event, index) => `
        <div class="event-card animate">
            <div class="event-header">
                <div class="event-number">${index + 1}️⃣</div>
                <h3>${escapeHtml(event.title)}</h3>
            </div>
            <div class="event-images">
                ${event.images && event.images.length > 0 ? 
                    event.images.map(img => `
                        <div class="event-image">
                            <img src="${escapeHtml(img)}" alt="${escapeHtml(event.title)}" onclick="openImageModal('${escapeHtml(img)}', '${escapeHtml(event.title)}')" onerror="this.style.display='none'">
                        </div>
                    `).join('') : 
                    '<div class="event-image-placeholder">暂无图片</div>'
                }
            </div>
            <p class="event-description">${escapeHtml(event.description)}</p>
            <div class="event-meta">
                <span class="severity ${getSeverityClass(event.severity)}">严重程度：${event.severity}</span>
            </div>
        </div>
    `).join('');
}

// 加载CTO黑历史
async function loadCtoHistory(page = 1) {
    try {
        showLoading();
        const result = await getCtoHistory(page, 6);
        if (result.success) {
            renderCtoHistory(result.data.history);
            renderPagination('ctoPagination', result.data.pagination, loadCtoHistory);
            currentCtoPage = page;
        } else {
            showError('加载CTO黑历史失败');
        }
    } catch (error) {
        console.error('加载CTO黑历史失败:', error);
        showError('加载CTO黑历史失败');
    } finally {
        hideLoading();
    }
}

// 渲染CTO黑历史
function renderCtoHistory(history) {
    const container = document.getElementById('ctoHistoryGrid');
    if (!container) return;
    
    if (history.length === 0) {
        container.innerHTML = '<div class="no-data">暂无数据</div>';
        return;
    }
    
    container.innerHTML = history.map(item => `
        <div class="cto-card animate">
            <div class="cto-header">
                <h3 class="cto-title">${escapeHtml(item.title)}</h3>
            </div>
            <div class="cto-content">
                <p class="cto-description">${escapeHtml(item.description)}</p>
                <div class="cto-images">
                    ${item.images && item.images.length > 0 ? 
                        item.images.map(img => `
                            <div class="cto-image">
                                <img src="${escapeHtml(img)}" alt="CTO黑历史图片" onclick="openImageModal('${escapeHtml(img)}', 'CTO黑历史图片')" onerror="this.style.display='none'">
                            </div>
                        `).join('') : 
                        '<div class="cto-image-placeholder">暂无图片</div>'
                    }
                </div>
            </div>
            <div class="cto-meta">
                发布时间：${formatDate(item.created_at)}
            </div>
        </div>
    `).join('');
}

// 加载评论
async function loadComments(page = 1) {
    try {
        showLoading();
        const result = await getComments(page, 10);
        if (result.success) {
            renderComments(result.data.comments);
            renderPagination('commentsPagination', result.data.pagination, loadComments);
            currentCommentsPage = page;
        } else {
            showError('加载评论失败');
        }
    } catch (error) {
        console.error('加载评论失败:', error);
        showError('加载评论失败');
    } finally {
        hideLoading();
    }
}

// 渲染评论
function renderComments(comments) {
    const container = document.getElementById('commentsList');
    if (!container) return;
    
    if (comments.length === 0) {
        container.innerHTML = '<div class="no-data">暂无评论</div>';
        return;
    }
    
    container.innerHTML = comments.map(comment => `
        <div class="comment-item animate">
            <div class="comment-header">
                <span class="comment-author">${escapeHtml(comment.author)}</span>
                <span class="comment-time">${formatDate(comment.created_at)}</span>
            </div>
            <div class="comment-content">${escapeHtml(comment.content)}</div>
        </div>
    `).join('');
}

// 渲染分页
function renderPagination(containerId, pagination, loadFunction) {
    const container = document.getElementById(containerId);
    if (!container || !pagination) return;
    
    const { current, total, hasNext, hasPrev } = pagination;
    
    let html = '';
    
    if (hasPrev) {
        html += `<button onclick="${loadFunction.name}(${current - 1})">上一页</button>`;
    }
    
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
        html += `<button class="${i === current ? 'active' : ''}" onclick="${loadFunction.name}(${i})">${i}</button>`;
    }
    
    if (hasNext) {
        html += `<button onclick="${loadFunction.name}(${current + 1})">下一页</button>`;
    }
    
    container.innerHTML = html;
}

// 显示添加事件表单
function showAddEventForm() {
    eventCaptchaAnswer = generateCaptcha();
    const eventCaptchaText = document.getElementById('eventCaptchaText');
    const addEventModal = document.getElementById('addEventModal');
    
    if (eventCaptchaText) {
        eventCaptchaText.textContent = eventCaptchaAnswer;
    }
    
    if (addEventModal) {
        addEventModal.classList.add('active');
    }
}

// 显示添加CTO表单
function showAddCtoForm() {
    ctoCaptchaAnswer = generateCaptcha();
    const ctoCaptchaText = document.getElementById('ctoCaptchaText');
    const addCtoModal = document.getElementById('addCtoModal');
    
    if (ctoCaptchaText) {
        ctoCaptchaText.textContent = ctoCaptchaAnswer;
    }
    
    if (addCtoModal) {
        addCtoModal.classList.add('active');
    }
}

// 关闭模态框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// 刷新验证码
function refreshEventCaptcha() {
    eventCaptchaAnswer = generateCaptcha();
    const eventCaptchaText = document.getElementById('eventCaptchaText');
    if (eventCaptchaText) {
        eventCaptchaText.textContent = eventCaptchaAnswer;
    }
    // 清空用户输入
    const input = document.querySelector('#addEventModal input[name="captcha"]');
    if (input) {
        input.value = '';
        input.focus();
    }
}

function refreshCtoCaptcha() {
    ctoCaptchaAnswer = generateCaptcha();
    const ctoCaptchaText = document.getElementById('ctoCaptchaText');
    if (ctoCaptchaText) {
        ctoCaptchaText.textContent = ctoCaptchaAnswer;
    }
    // 清空用户输入
    const input = document.querySelector('#addCtoModal input[name="captcha"]');
    if (input) {
        input.value = '';
        input.focus();
    }
}

function refreshCommentCaptcha() {
    commentCaptchaAnswer = generateCaptcha();
    const commentCaptchaText = document.getElementById('commentCaptchaText');
    if (commentCaptchaText) {
        commentCaptchaText.textContent = commentCaptchaAnswer;
    }
    // 清空用户输入
    const input = document.querySelector('#commentForm input[name="captcha"]');
    if (input) {
        input.value = '';
        input.focus();
    }
}

// 插入表情到评论框
function insertEmoji(emoji) {
    const commentContent = document.getElementById('commentContent');
    const commentCharCount = document.getElementById('commentCharCount');
    
    if (commentContent) {
        const currentValue = commentContent.value;
        const cursorPosition = commentContent.selectionStart;
        
        // 检查是否超过字符限制
        if (currentValue.length + emoji.length > 200) {
            showError('添加表情后将超过字符限制');
            return;
        }
        
        // 在光标位置插入表情
        const newValue = currentValue.slice(0, cursorPosition) + emoji + currentValue.slice(cursorPosition);
        commentContent.value = newValue;
        
        // 更新字符计数
        if (commentCharCount) {
            commentCharCount.textContent = newValue.length;
        }
        
        // 设置光标位置到表情后面
        const newCursorPosition = cursorPosition + emoji.length;
        commentContent.setSelectionRange(newCursorPosition, newCursorPosition);
        commentContent.focus();
    }
}

// 设置表单验证
function setupFormValidation() {
    // 评论表单
    const commentForm = document.getElementById('commentForm');
    const commentContent = document.getElementById('commentContent');
    const commentCharCount = document.getElementById('commentCharCount');
    
    if (commentContent && commentCharCount) {
        commentContent.addEventListener('input', function() {
            commentCharCount.textContent = this.value.length;
        });
    }
    
    if (commentForm) {
        commentForm.addEventListener('submit', handleCommentSubmit);
    }
    
    // 事件表单
    const eventForm = document.getElementById('addEventForm');
    const eventDescription = document.getElementById('eventDescription');
    const eventCharCount = document.getElementById('eventCharCount');
    
    if (eventDescription && eventCharCount) {
        eventDescription.addEventListener('input', function() {
            eventCharCount.textContent = this.value.length;
        });
    }
    
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventSubmit);
    }
    
    // CTO表单
    const ctoForm = document.getElementById('addCtoForm');
    if (ctoForm) {
        ctoForm.addEventListener('submit', handleCtoSubmit);
    }
    
    // 设置图片上传
    setupImageUpload();
    
    // 初始化验证码
    refreshCommentCaptcha();
}

// 处理评论提交
async function handleCommentSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        author: '匿名用户', // 使用默认匿名用户名
        content: formData.get('content'),
        captcha: formData.get('captcha'),
        captchaAnswer: commentCaptchaAnswer
    };
    
    try {
        const result = await addComment(data);
        if (result.success) {
            showSuccess('评论发表成功');
            event.target.reset();
            const commentCharCount = document.getElementById('commentCharCount');
            if (commentCharCount) {
                commentCharCount.textContent = '0';
            }
            refreshCommentCaptcha();
            loadComments(1);
        } else {
            // 根据错误代码显示不同的错误信息
            let errorMessage = result.error || '评论发表失败';
            
            switch (result.code) {
                case 'CAPTCHA_INVALID':
                    errorMessage = '验证码错误，请重新输入';
                    refreshCommentCaptcha();
                    break;
                case 'CONTENT_TOO_LONG':
                    errorMessage = `评论内容过长（${result.length}字符），请控制在${result.maxLength}字符以内`;
                    break;
                case 'CONTENT_TOO_SHORT':
                    errorMessage = `评论内容过短，请至少输入${result.minLength}个字符`;
                    break;
                case 'AUTHOR_NAME_INVALID':
                    errorMessage = '昵称格式不正确，请使用2-20个字符';
                    break;
                case 'MISSING_REQUIRED_FIELDS':
                    if (result.missingFields) {
                        errorMessage = `请填写以下必填字段：${result.missingFields.join('、')}`;
                    }
                    break;
                case 'RATE_LIMIT_EXCEEDED':
                    errorMessage = '评论过于频繁，请稍后再试';
                    break;
            }
            
            showError(errorMessage);
        }
    } catch (error) {
        console.error('评论提交失败:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('网络连接失败，请检查网络后重试');
        } else if (error.message.includes('timeout')) {
            showError('请求超时，请稍后重试');
        } else {
            showError('网络错误，请稍后重试');
        }
    }
}

// 处理事件提交
async function handleEventSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const images = getPreviewImages('eventImagePreview');
    
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        severity: formData.get('severity'),
        images: images,
        captcha: formData.get('captcha'),
        captchaAnswer: eventCaptchaAnswer
    };
    
    try {
        const result = await addCompanyEvent(data);
        if (result.success) {
            showSuccess('事件添加成功');
            closeModal('addEventModal');
            event.target.reset();
            clearImagePreview('eventImagePreview');
            const eventCharCount = document.getElementById('eventCharCount');
            if (eventCharCount) {
                eventCharCount.textContent = '0';
            }
            loadCompanyEvents(1);
        } else {
            // 根据错误代码显示不同的错误信息
            let errorMessage = result.error || '事件添加失败';
            
            switch (result.code) {
                case 'TOO_MANY_IMAGES':
                    errorMessage = '最多只能上传5张图片，请删除多余的图片';
                    break;
                case 'IMAGE_TOO_LARGE':
                    errorMessage = `图片过大（${result.size}MB），请压缩后重新上传`;
                    break;
                case 'UNSUPPORTED_IMAGE_FORMAT':
                    errorMessage = '图片格式不支持，请使用JPG、PNG或GIF格式';
                    break;
                case 'CAPTCHA_INVALID':
                    errorMessage = '验证码错误，请重新输入';
                    refreshEventCaptcha();
                    break;
                case 'MISSING_REQUIRED_FIELDS':
                    if (result.missingFields) {
                        errorMessage = `请填写以下必填字段：${result.missingFields.join('、')}`;
                    }
                    break;
            }
            
            showError(errorMessage);
        }
    } catch (error) {
        console.error('事件提交失败:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('网络连接失败，请检查网络后重试');
        } else if (error.message.includes('timeout')) {
            showError('请求超时，请稍后重试');
        } else {
            showError('网络错误，请稍后重试');
        }
    }
}

// 处理CTO提交
async function handleCtoSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const images = getPreviewImages('ctoImagePreview');
    
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        images: images,
        captcha: formData.get('captcha'),
        captchaAnswer: ctoCaptchaAnswer
    };
    
    try {
        const result = await addCtoHistory(data);
        if (result.success) {
            showSuccess('CTO黑历史添加成功');
            closeModal('addCtoModal');
            event.target.reset();
            clearImagePreview('ctoImagePreview');
            loadCtoHistory(1);
        } else {
            // 根据错误代码显示不同的错误信息
            let errorMessage = result.error || 'CTO黑历史添加失败';
            
            switch (result.code) {
                case 'TOO_MANY_IMAGES':
                    errorMessage = '最多只能上传5张图片，请删除多余的图片';
                    break;
                case 'IMAGE_TOO_LARGE':
                    errorMessage = `图片过大（${result.size}MB），请压缩后重新上传`;
                    break;
                case 'UNSUPPORTED_IMAGE_FORMAT':
                    errorMessage = '图片格式不支持，请使用JPG、PNG或GIF格式';
                    break;
                case 'CAPTCHA_INVALID':
                    errorMessage = '验证码错误，请重新输入';
                    refreshCtoCaptcha();
                    break;
                case 'MISSING_REQUIRED_FIELDS':
                    if (result.missingFields) {
                        errorMessage = `请填写以下必填字段：${result.missingFields.join('、')}`;
                    }
                    break;
            }
            
            showError(errorMessage);
        }
    } catch (error) {
        console.error('CTO提交失败:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('网络连接失败，请检查网络后重试');
        } else if (error.message.includes('timeout')) {
            showError('请求超时，请稍后重试');
        } else {
            showError('网络错误，请稍后重试');
        }
    }
}

// 图片上传相关函数
function setupImageUpload() {
    // 事件图片上传
    const eventImageInput = document.getElementById('eventImages');
    if (eventImageInput) {
        eventImageInput.addEventListener('change', function(e) {
            handleImageUpload(e.target.files, 'eventImagePreview');
        });
    }
    
    // CTO图片上传
    const ctoImageInput = document.getElementById('ctoImages');
    if (ctoImageInput) {
        ctoImageInput.addEventListener('change', function(e) {
            handleImageUpload(e.target.files, 'ctoImagePreview');
        });
    }
}

// 处理图片上传
async function handleImageUpload(files, previewContainerId) {
    const previewContainer = document.getElementById(previewContainerId);
    if (!previewContainer) {
        showError('图片预览容器未找到');
        return;
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxImages = 5; // 最多上传5张图片
    
    // 检查当前已有图片数量
    const currentImages = previewContainer.querySelectorAll('.image-preview-item').length;
    const remainingSlots = maxImages - currentImages;
    
    if (remainingSlots <= 0) {
        showError(`最多只能上传 ${maxImages} 张图片`);
        return;
    }
    
    if (files.length > remainingSlots) {
        showError(`还可以上传 ${remainingSlots} 张图片，请重新选择`);
        return;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let file of files) {
        // 检查文件类型
        if (!allowedTypes.includes(file.type)) {
            showError(`文件 "${file.name}" 格式不支持，只支持 JPG、PNG、GIF 格式`);
            errorCount++;
            continue;
        }
        
        // 检查文件大小
        if (file.size > maxSize) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            showError(`文件 "${file.name}" 大小为 ${sizeMB}MB，超过 5MB 限制`);
            errorCount++;
            continue;
        }
        
        try {
            showLoading();
            const base64 = await convertToBase64(file);
            addImagePreview(base64, previewContainer, file.name, file.type);
            successCount++;
        } catch (error) {
            showError(`文件 "${file.name}" 处理失败: ${error.message}`);
            errorCount++;
        } finally {
            hideLoading();
        }
    }
    
    // 显示处理结果
    if (successCount > 0) {
        showSuccess(`成功上传 ${successCount} 张图片`);
    }
    if (errorCount > 0) {
        showError(`${errorCount} 张图片上传失败`);
    }
}

// 转换图片为base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('文件读取失败'));
        reader.readAsDataURL(file);
    });
}

// 添加图片预览
function addImagePreview(base64, container, fileName = '', mimeType = '') {
    const previewItem = document.createElement('div');
    previewItem.className = 'image-preview-item';
    previewItem.style.cssText = 'position: relative; display: inline-block; margin: 5px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: #f9f9f9;';
    
    const img = document.createElement('img');
    img.src = base64;
    img.className = 'preview-image';
    img.style.cssText = 'width: 100px; height: 100px; object-fit: cover; display: block;';
    img.alt = fileName || '预览图片';
    
    // 存储MIME类型信息到data属性中
    if (mimeType) {
        img.setAttribute('data-mime-type', mimeType);
    }
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'image-preview-remove';
    removeBtn.innerHTML = '×';
    removeBtn.style.cssText = 'position: absolute; top: 2px; right: 2px; width: 20px; height: 20px; border: none; background: rgba(255, 0, 0, 0.7); color: white; border-radius: 50%; cursor: pointer; font-size: 12px; line-height: 1; display: flex; align-items: center; justify-content: center;';
    removeBtn.title = '删除图片';
    removeBtn.onclick = () => {
        container.removeChild(previewItem);
        showSuccess('图片已删除');
    };
    
    // 添加文件名显示（如果有）
    if (fileName) {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'image-name';
        nameDiv.style.cssText = 'padding: 4px; font-size: 10px; color: #666; text-align: center; word-break: break-all; max-width: 100px;';
        nameDiv.textContent = fileName.length > 15 ? fileName.substring(0, 12) + '...' : fileName;
        nameDiv.title = fileName;
        previewItem.appendChild(nameDiv);
    }
    
    previewItem.appendChild(img);
    previewItem.appendChild(removeBtn);
    container.appendChild(previewItem);
}

// 获取预览图片的base64数据
function getPreviewImages(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    
    const images = [];
    const previewItems = container.querySelectorAll('.image-preview-item img');
    
    previewItems.forEach(img => {
        const base64Data = img.src;
        const mimeType = img.getAttribute('data-mime-type') || 'image/jpeg';
        
        // 根据容器ID决定返回格式
        if (containerId === 'eventImagePreview') {
            // 公司事件期望完整的data:image/xxx;base64,xxx格式
            images.push(base64Data);
        } else {
            // CTO黑历史期望{data: base64String, type: mimeType}格式
            const base64String = base64Data.split(',')[1] || base64Data;
            images.push({
                data: base64String,
                type: mimeType
            });
        }
    });
    
    return images;
}

// 清除图片预览
function clearImagePreview(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
}

// 工具函数
function getSeverityClass(severity) {
    switch (severity) {
        case '低': return 'low';
        case '中': return 'medium';
        case '高': return 'high';
        case '极高': return 'high';
        default: return 'medium';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
}

function showLoading() {
    let loadingDiv = document.getElementById('loading-overlay');
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-overlay';
        loadingDiv.innerHTML = '<div class="loading-spinner">处理中...</div>';
        loadingDiv.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10001;';
        
        const spinner = loadingDiv.querySelector('.loading-spinner');
        spinner.style.cssText = 'background: white; padding: 20px 40px; border-radius: 8px; font-size: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);';
        
        document.body.appendChild(loadingDiv);
    }
    loadingDiv.style.display = 'flex';
}

function hideLoading() {
    const loadingDiv = document.getElementById('loading-overlay');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

// 通用通知函数
function showNotification(message, type = 'info') {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = `notification notification-${type}`;
    notificationDiv.textContent = message;
    
    const colors = {
        error: '#ff4444',
        success: '#44ff44',
        info: '#4444ff',
        warning: '#ffaa44'
    };
    
    notificationDiv.style.cssText = `
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: ${colors[type] || colors.info}; 
        color: white; 
        padding: 12px 20px; 
        border-radius: 6px; 
        z-index: 10000; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-size: 14px;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideIn 0.3s ease-out;
    `;
    
    // 添加动画样式
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notificationDiv);
    
    // 自动移除通知
    setTimeout(() => {
        if (notificationDiv.parentNode) {
            notificationDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notificationDiv.parentNode) {
                    notificationDiv.parentNode.removeChild(notificationDiv);
                }
            }, 300);
        }
    }, type === 'error' ? 6000 : 3000);
}

// 图片放大模态框功能
function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt || '图片';
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 点击模态框背景关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        closeImageModal();
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async function() {
    try {
        setupEventListeners();
        updateViewCount();
        
        // 并行加载所有数据
        await Promise.all([
            loadPageStats(),
            loadCompanyEvents(),
            loadCtoHistory(),
            loadComments()
        ]);
        
        setupFormValidation();
        // setupImageUpload() 已在 setupFormValidation() 中调用，不需要重复调用
        
        // 隐藏初始加载页面
        const initialLoading = document.getElementById('loading');
        if (initialLoading) {
            initialLoading.style.display = 'none';
        }
        
        console.log('页面初始化完成');
    } catch (error) {
        console.error('页面初始化失败:', error);
        // 即使出错也要隐藏loading
        const initialLoading = document.getElementById('loading');
        if (initialLoading) {
            initialLoading.style.display = 'none';
        }
        showError('页面加载失败，请刷新重试');
    }
});
