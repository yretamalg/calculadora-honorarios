import React from 'react';
import { Share2, Facebook, Twitter, Instagram, Link2 } from 'lucide-react';
import { WhatsappIcon } from '../../shared/ui/whatsapp';
import { useAnalytics } from '@/hooks/useAnalytics';

const ShareButtons = () => {
  const { trackEvent } = useAnalytics();
  const shareUrl = encodeURIComponent('https://honorario.netlify.app/');
  const shareTitle = encodeURIComponent('Calculadora de Retención de Honorarios Chile 2024-2028');
  const shareText = encodeURIComponent('Calcula fácilmente tu retención de honorarios para profesionales en Chile con las tasas vigentes 2024-2028.');

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      name: 'X (Twitter)', 
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
    },
    {
      name: 'WhatsApp',
      icon: <WhatsappIcon className="w-4 h-4" />,
      url: `https://wa.me/?text=${shareText}%20${shareUrl}`,
    },
    {
      name: 'Reddit',
      icon: <Link2 className="w-4 h-4" />,
      url: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-4 h-4" />,
      url: `https://www.instagram.com/`,
    },
    {
      name: 'General',
      icon: <Share2 className="w-4 h-4" />,
      action: async () => {
        try {
          if (navigator.share) {
            await navigator.share({
              title: decodeURIComponent(shareTitle),
              text: decodeURIComponent(shareText),
              url: decodeURIComponent(shareUrl)
            });
            trackEvent('share_success', { method: 'native' });
          } else {
            await navigator.clipboard.writeText(decodeURIComponent(shareUrl));
            trackEvent('share_success', { method: 'copy' });
          }
        } catch (err) {
          console.error('Error al compartir:', err);
          trackEvent('share_error', { 
            error: err.message,
            method: navigator.share ? 'native' : 'copy'
          });
        }
      },
      tooltip: 'Compartir'
    }
  ];

  const handleShare = (link) => {
    try {
      if (link.action) {
        link.action();
      } else {
        window.open(link.url, '_blank', 'noopener,noreferrer');
        trackEvent('share_click', {
          platform: link.name,
          url: shareUrl
        });
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      trackEvent('share_error', {
        platform: link.name,
        error: error.message
      });
    }
  };

  return (
    <div className="w-full">
      <div className="container max-w-2xl mx-auto px-4 py-3">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-400">Compartir en redes</span>
          <div className="flex items-center gap-1">
            {shareLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleShare(link)}
                className="p-1.5 text-slate-400 hover:text-slate-300 rounded-md 
                         transition-colors duration-200 focus:outline-none 
                         focus:ring-1 focus:ring-orange-500"
                aria-label={link.tooltip || `Compartir en ${link.name}`}
                title={link.tooltip || `Compartir en ${link.name}`}
              >
                {link.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;