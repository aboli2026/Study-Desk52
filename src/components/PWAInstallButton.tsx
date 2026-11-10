import React, { useState } from 'react';
import { Download, Smartphone, Check, X, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'compact'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installing, setInstalling] = useState(false);

  if (isInstalled) {
    return (
      <div className={`flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs font-medium ${className}`}>
        <Check className="w-3.5 h-3.5" />
        <span>وب‌اپ نصب شده</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      setInstalling(true);
      try {
        await install();
      } finally {
        setInstalling(false);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Fallback modal or prompt
      setShowIOSModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        disabled={installing}
        title="نصب به عنوان وب‌اپلیکیشن (PWA)"
        className={`flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
          variant === 'full'
            ? 'w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg text-sm'
            : 'py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold shadow-xs'
        } ${className}`}
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span>{installing ? 'در حال نصب...' : 'نصب وب‌اپ (PWA)'}</span>
      </button>

      {/* Guide modal for iOS and manual installation */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl text-neutral-900 border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>راهنمای نصب وب‌اپلیکیشن</span>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs leading-relaxed text-neutral-600">
              <p className="font-medium text-neutral-800">
                برای افزودن این برنامه به صفحه اصلی دستگاه (موبایل یا تبلت):
              </p>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ۱
                  </div>
                  <div>
                    در مرورگر (سافاری یا کروم) دکمه <strong>اشتراک‌گذاری (Share)</strong> یا منوی سه‌نقطه را بزنید.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ۲
                  </div>
                  <div>
                    گزینه <strong>«افزودن به صفحه اصلی» (Add to Home Screen)</strong> یا <strong>«نصب برنامه» (Install App)</strong> را انتخاب کنید.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ۳
                  </div>
                  <div>
                    روی <strong>Add</strong> یا <strong>نصب</strong> کلیک کنید تا آیکون برنامه در منوی گوشی ظاهر شود.
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-neutral-500 bg-blue-50/70 p-2.5 rounded-lg border border-blue-100">
                💡 این وب‌اپ بدون نیاز به اپ‌استور یا بازار، به‌صورت کاملاً آفلاین و سریع در دستگاه شما اجرا می‌شود.
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full rounded-xl bg-neutral-900 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition cursor-pointer"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
};
