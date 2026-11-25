import { friendsIntro } from '@constants/friends-config';
import { useTranslation } from '@hooks/useTranslation';
import { cn } from '@lib/utils';
import { useClipboard } from 'foxact/use-clipboard';
import { useCallback, useState } from 'react';
import SakuraSVG from '../svg/SakuraSvg';

const LABEL_CLASS = 'mb-1.5 block font-bold text-muted-foreground text-xs uppercase tracking-wide';
const INPUT_CLASS =
  'rounded-xl border-2 border-border bg-muted/40 px-4 py-2.5 font-bold text-foreground text-sm transition-all placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/15';

interface FormData {
  site: string;
  owner: string;
  url: string;
  desc: string;
  image: string;
  color: string;
}

interface Props {
  locale?: string;
}

export default function FriendRequestForm({ locale }: Props) {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState<FormData>({
    site: '',
    owner: '',
    url: '',
    desc: '',
    image: '',
    color: '#ffc0cb',
  });

  const { copied, copy } = useClipboard({ timeout: 2000 });

  const generateText = useCallback(() => {
    return `site: ${formData.site || t('friends.sitePlaceholder')}
url: ${formData.url || 'https://example.com'}
owner: ${formData.owner || t('friends.ownerPlaceholder')}
desc: ${formData.desc || t('friends.descPlaceholder')}
image: ${formData.image || 'https://example.com/avatar.jpg'}
color: "${formData.color || '#ffc0cb'}"`;
  }, [formData, t]);

  const handleCopy = useCallback(() => {
    const yaml = generateText();
    copy(yaml);
  }, [copy, generateText]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [], // 空依赖 - 使用函数式更新
  );

  return (
    <div className="mb-4 w-full">
      <div className="border-border bg-card relative overflow-hidden rounded-3xl border p-6 shadow-sm md:p-3">
        {/* Cute Corner Decor */}
        <div className="bg-primary/10 absolute -top-6 -right-6 h-24 w-24 rounded-full" />
        <div className="bg-primary/5 absolute -bottom-6 -left-6 h-24 w-24 rounded-full" />

        <div className="grid grid-cols-2 gap-12 md:grid-cols-1 md:gap-8">
          {/* Left Side: Form */}
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="text-foreground mb-2 flex items-center gap-2 text-2xl font-black">
                <SakuraSVG className="size-6 animate-spin text-[#FFC0CB] duration-10000" />
                {t('friends.applyTitle')}
              </h2>
              <p className="text-muted-foreground text-sm font-medium">{friendsIntro.applyDesc}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative">
                  <label htmlFor="friend-site" className={LABEL_CLASS}>
                    {t('friends.siteName')}
                  </label>
                  <input
                    id="friend-site"
                    type="text"
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    className={cn(INPUT_CLASS, 'w-full')}
                    placeholder={t('friends.sitePlaceholder')}
                  />
                </div>
                <div className="group relative">
                  <label htmlFor="friend-owner" className={LABEL_CLASS}>
                    {t('friends.ownerName')}
                  </label>
                  <input
                    id="friend-owner"
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    className={cn(INPUT_CLASS, 'w-full')}
                    placeholder={t('friends.ownerPlaceholder')}
                  />
                </div>
              </div>

              <div className="group relative">
                <label htmlFor="friend-url" className={LABEL_CLASS}>
                  {t('friends.siteUrl')}
                </label>
                <input
                  id="friend-url"
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className={cn(INPUT_CLASS, 'w-full')}
                  placeholder="https://your-site.com"
                />
              </div>

              <div className="group relative">
                <label htmlFor="friend-desc" className={LABEL_CLASS}>
                  {t('friends.siteDesc')}
                </label>
                <textarea
                  id="friend-desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows={2}
                  className={cn(INPUT_CLASS, 'w-full resize-none')}
                  placeholder={t('friends.descPlaceholder')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group relative">
                  <label htmlFor="friend-image" className={LABEL_CLASS}>
                    {t('friends.avatarUrl')}
                  </label>
                  <input
                    id="friend-image"
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={cn(INPUT_CLASS, 'w-full')}
                    placeholder="https://..."
                  />
                </div>
                <div className="group relative">
                  <label htmlFor="friend-color" className={LABEL_CLASS}>
                    {t('friends.themeColor')}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="border-border relative h-10 w-10 overflow-hidden rounded-xl border-2 shadow-sm transition-transform hover:scale-105">
                      <input
                        id="friend-color"
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] cursor-pointer p-0"
                      />
                    </div>
                    <input
                      aria-label={t('friends.themeColor')}
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className={cn(INPUT_CLASS, 'flex-1')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Preview / Code */}
          <div className="bg-muted/60 relative flex flex-col justify-center rounded-xl p-6 md:p-3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-wider uppercase">{t('friends.previewTitle')}</h3>
              <button
                type="button"
                onClick={handleCopy}
                className="group text-foreground relative px-3 py-2 text-base font-bold transition-transform hover:-translate-y-1"
              >
                <div className="border-foreground absolute inset-0 rotate-[1deg] rounded-lg border-2 border-dashed transition-all group-hover:rotate-0"></div>
                {copied ? t('friends.copiedConfig') : t('friends.copyConfig')}
              </button>
            </div>

            <div className="border-border bg-background relative flex-1 overflow-hidden rounded-xl border-2 p-4">
              <pre className="text-foreground/80 font-mono text-xs leading-relaxed whitespace-pre-wrap">{generateText()}</pre>
            </div>

            <div className="bg-primary/10 dark:text-primary mt-6 flex items-center gap-3 rounded-xl p-4 text-xs font-medium text-pink-600">
              {t('friends.hint')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
