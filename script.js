// 全局变量
let viewCount = 0;
let currentImageIndex = 0;
const totalImages = 15;
const images = [];

// 模拟第三方API服务配置
const API_CONFIG = {
    // 这里可以替换为真实的第三方API服务
    VIEW_API: 'https://api.example.com/views'
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadInitialData();
    initializeCarousel();
});

// 初始化页面
function initializePage() {
    // 隐藏加载动画
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }, 1000);

    // 更新阅读量
    updateViewCount();
    
    // 从本地存储恢复状态
    restoreState();
}

// 设置事件监听器
function setupEventListeners() {
    // 滚动动画
    setupScrollAnimations();
    
    // 走马灯控制
    setupCarouselControls();
    
    // 图片查看器控制
    setupImageViewer();
}

// 初始化走马灯
function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const thumbnailsContainer = document.getElementById('thumbnails');
    
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
    
    // 上一张/下一张按钮
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateCarousel();
        updateThumbnails();
    });
    
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateCarousel();
        updateThumbnails();
    });
    
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
    viewerClose.addEventListener('click', closeImageViewer);
    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            closeImageViewer();
        }
    });
    
    // 查看器内切换图片
    viewerPrev.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止触发关闭
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateViewerImage();
        updateCarousel();
        updateThumbnails();
    });
    
    viewerNext.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止触发关闭
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateViewerImage();
        updateCarousel();
        updateThumbnails();
    });
    
    // 防止图片点击事件冒泡
    viewerImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// 更新走马灯
function updateCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const currentImage = document.getElementById('currentImage');
    
    // 移动轨道
    carouselTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    
    // 更新计数器
    currentImage.textContent = currentImageIndex + 1;
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
    imageViewer.classList.remove('active');
    
    // 恢复背景滚动
    document.body.style.overflow = '';
}

// 更新查看器图片
function updateViewerImage() {
    const viewerImage = document.getElementById('viewerImage');
    const viewerCounter = document.getElementById('viewerCounter');
    
    viewerImage.src = images[currentImageIndex];
    viewerCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
}

// 更新阅读量
function updateViewCount() {
    viewCount++;
    document.getElementById('viewCount').textContent = viewCount;
    
    // 发送到API（模拟）
    sendViewToAPI().catch(error => {
        console.log('阅读量API调用失败');
    });
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
    const animatedElements = document.querySelectorAll('.event-card, .warning-quote, .carousel-container, .warning-item');
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
    document.getElementById('viewCount').textContent = viewCount;
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

// API调用函数（模拟）
async function sendViewToAPI() {
    // 模拟API调用
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('阅读量已发送到API');
            resolve();
        }, 200);
    });
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
