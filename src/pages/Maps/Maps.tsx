import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Maps.module.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type FilterType = 'all' | 'hangouts' | 'events' | 'offers';
type MapStyle = 'light' | 'minimal' | 'streets' | 'dark';

interface MapItem {
  id: string;
  type: 'hangout' | 'event' | 'offer';
  title: string;
  subtitle: string;
  lat: number;
  lng: number;
  isToday: boolean;
  time?: string;
  data: any;
}

// Map tile configurations
const MAP_TILES = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  minimal: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  streets: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
};

// Custom marker icons
const createCustomIcon = (type: 'hangout' | 'event' | 'offer', isToday: boolean) => {
  const colors = {
    hangout: '#6527fc',
    event: '#ff9500',
    offer: '#34c759',
  };

  const icons = {
    hangout: '🎯',
    event: '🎪',
    offer: '🎁',
  };

  const html = `
    <div style="
      position: relative;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${colors[type]};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      transition: all 0.2s ease;
    ">
      <span style="
        font-size: 18px;
        transform: rotate(45deg);
      ">${icons[type]}</span>
      ${isToday ? `
        <div style="
          position: absolute;
          top: -3px;
          right: -3px;
          width: 10px;
          height: 10px;
          background-color: #ff3b30;
          border: 2px solid white;
          border-radius: 50%;
          animation: blink 1s infinite;
        "></div>
      ` : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

const Maps: React.FC = () => {
  const navigate = useNavigate();
  const { hangouts, events, offers } = useApp();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [mapStyle, setMapStyle] = useState<MapStyle>('light');

  // Mock coordinates
  const getCoordinates = (index: number) => {
    const baseLat = 37.7749;
    const baseLng = -122.4194;
    return {
      lat: baseLat + (Math.random() - 0.5) * 0.05,
      lng: baseLng + (Math.random() - 0.5) * 0.05,
    };
  };

  // Convert all items to map markers
  const mapItems = useMemo(() => {
    const items: MapItem[] = [];

    // Add hangouts
    hangouts.forEach((h, index) => {
      const hangoutTime = new Date(h.time);
      const isToday = hangoutTime.toDateString() === new Date().toDateString();
      const coords = getCoordinates(index);
      
      items.push({
        id: h.id,
        type: 'hangout',
        title: h.title,
        subtitle: `${h.spotsLeft} spots`,
        lat: coords.lat,
        lng: coords.lng,
        isToday,
        time: h.time,
        data: h,
      });
    });

    // Add events
    events.forEach((e, index) => {
      const eventTime = new Date(e.time);
      const isToday = eventTime.toDateString() === new Date().toDateString();
      const coords = getCoordinates(index + 100);
      
      items.push({
        id: e.id,
        type: 'event',
        title: e.title,
        subtitle: `${e.hangoutsCount} groups`,
        lat: coords.lat,
        lng: coords.lng,
        isToday,
        time: e.time,
        data: e,
      });
    });

    // Add offers
    offers.forEach((o, index) => {
      const coords = getCoordinates(index + 200);
      
      items.push({
        id: o.id,
        type: 'offer',
        title: o.title,
        subtitle: o.perk,
        lat: coords.lat,
        lng: coords.lng,
        isToday: false,
        data: o,
      });
    });

    return items;
  }, [hangouts, events, offers]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return mapItems;
    
    const typeMap = {
      hangouts: 'hangout',
      events: 'event',
      offers: 'offer',
    };
    
    return mapItems.filter(item => item.type === typeMap[activeFilter]);
  }, [mapItems, activeFilter]);

  const todayCount = mapItems.filter(i => i.isToday).length;

  const handleMarkerClick = (item: MapItem) => {
    if (item.type === 'hangout') {
      navigate(`/hangouts/${item.id}`);
    } else if (item.type === 'event') {
      navigate(`/events/${item.id}`);
    } else {
      navigate(`/create?offer=${item.id}`);
    }
  };

  const getTimeString = (time?: string) => {
    if (!time) return '';
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getTypeConfig = (type: 'hangout' | 'event' | 'offer') => {
    const configs = {
      hangout: { icon: '🎯', label: 'Hangout' },
      event: { icon: '🎪', label: 'Event' },
      offer: { icon: '🎁', label: 'Offer' },
    };
    return configs[type];
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Maps</h1>
        <p className={styles.subtitle}>{filteredItems.length} nearby</p>
      </div>

      {/* Today Banner */}
      {todayCount > 0 && (
        <div className={styles.todayBanner}>
          <span className={styles.todayPulse}></span>
          <span className={styles.todayText}>{todayCount} happening today</span>
        </div>
      )}

      {/* Filters */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterChip} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <span className={styles.filterIcon}>🗺️</span>
          <span className={styles.filterLabel}>All</span>
          <span className={styles.filterCount}>{mapItems.length}</span>
        </button>
        
        <button
          className={`${styles.filterChip} ${activeFilter === 'hangouts' ? styles.active : ''} ${styles.hangout}`}
          onClick={() => setActiveFilter('hangouts')}
        >
          <span className={styles.filterIcon}>🎯</span>
          <span className={styles.filterLabel}>Hangouts</span>
          <span className={styles.filterCount}>{hangouts.length}</span>
        </button>
        
        <button
          className={`${styles.filterChip} ${activeFilter === 'events' ? styles.active : ''} ${styles.event}`}
          onClick={() => setActiveFilter('events')}
        >
          <span className={styles.filterIcon}>🎪</span>
          <span className={styles.filterLabel}>Events</span>
          <span className={styles.filterCount}>{events.length}</span>
        </button>
        
        <button
          className={`${styles.filterChip} ${activeFilter === 'offers' ? styles.active : ''} ${styles.offer}`}
          onClick={() => setActiveFilter('offers')}
        >
          <span className={styles.filterIcon}>🎁</span>
          <span className={styles.filterLabel}>Offers</span>
          <span className={styles.filterCount}>{offers.length}</span>
        </button>
      </div>

      {/* Map Container */}
      <div className={styles.mapWrapper}>
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={13}
          className={styles.map}
          zoomControl={false}
        >
          <TileLayer
            attribution={MAP_TILES[mapStyle].attribution}
            url={MAP_TILES[mapStyle].url}
          />
          
          {filteredItems.map(item => {
            const config = getTypeConfig(item.type);
            
            return (
              <Marker
                key={item.id}
                position={[item.lat, item.lng]}
                icon={createCustomIcon(item.type, item.isToday)}
                eventHandlers={{
                  click: () => handleMarkerClick(item),
                }}
              >
                <Tooltip direction="top" offset={[0, -20]} opacity={0.95}>
                  <div className={styles.tooltip}>
                    <div className={styles.tooltipHeader}>
                      <span className={styles.tooltipIcon}>{config.icon}</span>
                      <span className={styles.tooltipType}>{config.label}</span>
                      {item.isToday && <span className={styles.tooltipToday}>•</span>}
                    </div>
                    <div className={styles.tooltipTitle}>{item.title}</div>
                    <div className={styles.tooltipSubtitle}>
                      {item.subtitle}
                      {item.time && ` • ${getTimeString(item.time)}`}
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Zoom Controls */}
        <div className={styles.mapControls}>
          <button className={styles.zoomBtn}>+</button>
          <button className={styles.zoomBtn}>−</button>
        </div>

        {/* Map Style Selector */}
        <div className={styles.styleSelector}>
          <button
            className={`${styles.styleBtn} ${mapStyle === 'light' ? styles.activeStyle : ''}`}
            onClick={() => setMapStyle('light')}
            title="Light"
          >
            ☀️
          </button>
          <button
            className={`${styles.styleBtn} ${mapStyle === 'minimal' ? styles.activeStyle : ''}`}
            onClick={() => setMapStyle('minimal')}
            title="Minimal"
          >
            ◯
          </button>
          <button
            className={`${styles.styleBtn} ${mapStyle === 'streets' ? styles.activeStyle : ''}`}
            onClick={() => setMapStyle('streets')}
            title="Streets"
          >
            🗺️
          </button>
          <button
            className={`${styles.styleBtn} ${mapStyle === 'dark' ? styles.activeStyle : ''}`}
            onClick={() => setMapStyle('dark')}
            title="Dark"
          >
            🌙
          </button>
        </div>
      </div>

      {/* FAB */}
      <button className={styles.fab} onClick={() => navigate('/create')}>
        <span className={styles.fabIcon}>+</span>
      </button>
    </div>
  );
};

export default Maps;
