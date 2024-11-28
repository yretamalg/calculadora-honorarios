import React from 'react';
import { Share2, Facebook, Twitter, Instagram, Link2 } from 'lucide-react';

const WhatsappIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const ShareButtons = () => {
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
          } else {
            await navigator.clipboard.writeText(decodeURIComponent(shareUrl));
          }
        } catch (err) {
          console.log('Error al compartir:', err);
        }
      },
      tooltip: 'Compartir'
    }
  ];

  const handleShare = (link) => {
    if (link.action) {
      link.action();
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer');
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
                className="p-1.5 text-slate-400 hover:text-slate-300 rounded-md transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
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