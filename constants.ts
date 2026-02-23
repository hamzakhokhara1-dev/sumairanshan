
import { Service, Staff, Voucher, Package, ServiceVoucher } from './types';

export const MENS_SERVICES: Service[] = [
  // HAIR SERVICES
  { id: 'm_hs_1', category: 'HAIR SERVICES', name: 'Hair Cut', description: 'Standard service', price: 1000, durationMin: 30, image: '' },
  { id: 'm_hs_2', category: 'HAIR SERVICES', name: 'Executive Haircut', description: 'Premium cut', price: 2000, durationMin: 45, image: '' },
  { id: 'm_hs_3', category: 'HAIR SERVICES', name: 'Hair Wash', description: 'Refreshing wash', price: 500, durationMin: 15, image: '' },
  { id: 'm_hs_4', category: 'HAIR SERVICES', name: 'Hair Polish', description: 'Shine and texture', price: 500, durationMin: 15, image: '' },
  { id: 'm_hs_5', category: 'HAIR SERVICES', name: 'Hair Styling', description: 'Standard styling', price: 500, durationMin: 20, image: '' },

  // BEARD SERVICES
  { id: 'm_bs_1', category: 'BEARD SERVICES', name: 'Beard Trim/Styling', description: 'Standard service', price: 800, durationMin: 20, image: '' },
  { id: 'm_bs_2', category: 'BEARD SERVICES', name: 'Executive Beard', description: 'Premium beard grooming', price: 1500, durationMin: 30, image: '' },

  // HAIR TREATMENTS
  { id: 'm_ht_1', category: 'HAIR TREATMENTS', name: 'Glossy Mask Treatment', description: 'Instant shine and deep conditioning.', price: 2500, durationMin: 30, image: '' },
  { id: 'm_ht_2', category: 'HAIR TREATMENTS', name: 'Protein Treatment', description: 'Strengthens weak and brittle hair.', price: 3000, durationMin: 45, image: '' },
  { id: 'm_ht_3', category: 'HAIR TREATMENTS', name: 'Restructure Treatment', description: 'Repairs damaged hair structure.', price: 4000, durationMin: 60, image: '' },
  { id: 'm_ht_4', category: 'HAIR TREATMENTS', name: 'Hair Keratin', description: 'Smoothing treatment (depends on length).', price: 6000, durationMin: 120, image: '' },
  { id: 'm_ht_5', category: 'HAIR TREATMENTS', name: 'X-tenso', description: 'Straightening treatment (depends on length).', price: 6000, durationMin: 120, image: '' },
  { id: 'm_ht_6', category: 'HAIR TREATMENTS', name: 'Perming', description: 'Add lasting curls (depends on length).', price: 8000, durationMin: 150, image: '' },

  // HAIR COLORING
  { id: 'm_hc_1', category: 'HAIR COLORING', name: 'Single Dye', description: 'Professional single tone (depends on length).', price: 1000, durationMin: 45, image: '' },
  { id: 'm_hc_2', category: 'HAIR COLORING', name: 'Highlights', description: 'Dimensional highlights (depends on length).', price: 5000, durationMin: 120, image: '' },
  { id: 'm_hc_3', category: 'HAIR COLORING', name: 'Ash Color', description: 'Trendy ash tones (depends on length).', price: 6000, durationMin: 150, image: '' },

  // FACIAL & SKIN SERVICES
  { id: 'm_fs_1', category: 'FACIAL & SKIN SERVICES', name: 'Basic Polisher', description: 'Exfoliation for a fresh look.', price: 1500, durationMin: 30, image: '' },
  { id: 'm_fs_2', category: 'FACIAL & SKIN SERVICES', name: 'Vitamin C Executive Polisher', description: 'Brightening polisher with antioxidants.', price: 2000, durationMin: 40, image: '' },
  { id: 'm_fs_3', category: 'FACIAL & SKIN SERVICES', name: 'Whitening Glowing Premium Polisher', description: 'Premium polisher for radiant skin.', price: 2500, durationMin: 45, image: '' },
  { id: 'm_fs_4', category: 'FACIAL & SKIN SERVICES', name: 'Janssen Prestige Polisher', description: 'Luxury polisher with Janssen products.', price: 3500, durationMin: 60, image: '' },
  { id: 'm_fs_5', category: 'FACIAL & SKIN SERVICES', name: 'SB Face Facial', description: 'Refreshing facial.', price: 2000, durationMin: 45, image: '' },
  { id: 'm_fs_6', category: 'FACIAL & SKIN SERVICES', name: 'Natural Life Face Facial', description: 'Natural ingredients.', price: 2500, durationMin: 45, image: '' },
  { id: 'm_fs_7', category: 'FACIAL & SKIN SERVICES', name: 'Dermacos Facial', description: 'Deep cleansing.', price: 3000, durationMin: 60, image: '' },
  { id: 'm_fs_8', category: 'FACIAL & SKIN SERVICES', name: 'Hydra Facial', description: 'Advanced hydration.', price: 5000, durationMin: 60, image: '' },

  // POLISH SERVICES
  { id: 'm_ps_1', category: 'POLISH SERVICES', name: 'Face Polish', description: 'Standard face polish.', price: 1000, durationMin: 20, image: '' },
  { id: 'm_ps_2', category: 'POLISH SERVICES', name: 'Neck Polish', description: 'Standard neck polish.', price: 500, durationMin: 15, image: '' },
  { id: 'm_ps_3', category: 'POLISH SERVICES', name: 'Hand Polish', description: 'Standard hand polish.', price: 500, durationMin: 20, image: '' },
  { id: 'm_ps_4', category: 'POLISH SERVICES', name: 'Feet Polish', description: 'Standard feet polish.', price: 500, durationMin: 20, image: '' },

  // WAXING SERVICES
  { id: 'm_ws_1', category: 'WAXING SERVICES', name: 'Cheek & Hair Removal', description: 'Precise hair removal.', price: 500, durationMin: 15, image: '' },
  { id: 'm_ws_2', category: 'WAXING SERVICES', name: 'Eyebrows Reshaping', description: 'Expert shaping.', price: 500, durationMin: 15, image: '' },
  { id: 'm_ws_3', category: 'WAXING SERVICES', name: 'Ear Hair Removal', description: 'Hygienic removal.', price: 500, durationMin: 10, image: '' },
  { id: 'm_ws_4', category: 'WAXING SERVICES', name: 'Nose Hair Removal', description: 'Quick removal.', price: 500, durationMin: 10, image: '' },
  { id: 'm_ws_5', category: 'WAXING SERVICES', name: 'Full Face Wax', description: 'Complete face wax.', price: 700, durationMin: 30, image: '' },
  { id: 'm_ws_6', category: 'WAXING SERVICES', name: 'Threading', description: 'Per area.', price: 200, durationMin: 10, image: '' },
  { id: 'm_ws_7', category: 'WAXING SERVICES', name: 'Waxing', description: 'Per area.', price: 300, durationMin: 15, image: '' },

  // MANICURE & PEDICURE
  { id: 'm_mp_1', category: 'MANICURE & PEDICURE', name: 'Express Manicure', description: 'Quick nail care.', price: 1600, durationMin: 30, image: '' },
  { id: 'm_mp_2', category: 'MANICURE & PEDICURE', name: 'Express Pedicure', description: 'Quick foot care.', price: 2000, durationMin: 30, image: '' },
  { id: 'm_mp_3', category: 'MANICURE & PEDICURE', name: 'Express Manicure & Pedicure', description: 'Complete express package.', price: 3500, durationMin: 50, image: '' },
  { id: 'm_mp_4', category: 'MANICURE & PEDICURE', name: 'Manicure & Pedicure (Simple)', description: 'Classic treatment.', price: 2500, durationMin: 60, image: '' },

  // SKIN TREATMENTS
  { id: 'm_st_1', category: 'SKIN TREATMENTS', name: 'Black Head Removal', description: 'Standard service.', price: 500, durationMin: 15, image: '' },
  { id: 'm_st_2', category: 'SKIN TREATMENTS', name: 'White Head Removal', description: 'Standard service.', price: 500, durationMin: 15, image: '' },
  { id: 'm_st_3', category: 'SKIN TREATMENTS', name: 'Black & White Head Removal', description: 'Complete extraction.', price: 800, durationMin: 30, image: '' },
  { id: 'm_st_4', category: 'SKIN TREATMENTS', name: 'Exfoliation', description: 'Deep skin cleaning.', price: 1000, durationMin: 20, image: '' },

  // MASSAGE SERVICES
  { id: 'm_ms_1', category: 'MASSAGE SERVICES', name: 'Machine Massage', description: 'Included in Azadi Deal.', price: 500, durationMin: 15, image: '' },
  { id: 'm_ms_2', category: 'MASSAGE SERVICES', name: 'Relaxing Body Massage', description: 'Stress relief.', price: 3000, durationMin: 60, image: '' },
  { id: 'm_ms_3', category: 'MASSAGE SERVICES', name: 'Full Body Massage', description: 'Complete relaxation.', price: 5000, durationMin: 60, image: '' },
];

export const WOMENS_SERVICES: Service[] = [
    // Hair Services
    { id: 'w_h_1', category: 'Hair Services', name: 'Loreal X-Tenso', description: 'High-end smoothing treatment.', price: 14999, durationMin: 180, image: '' },
    { id: 'w_h_2', category: 'Hair Services', name: 'Extenso Treatment', description: 'Premium straightening.', price: 25000, durationMin: 180, image: '' },
    { id: 'w_h_3', category: 'Hair Services', name: 'Rebonding', description: 'Permanent straightening.', price: 30000, durationMin: 240, image: '' },
    { id: 'w_h_4', category: 'Hair Services', name: 'Extenso + Keratin Combo', description: 'Ultimate smoothness and shine.', price: 35000, durationMin: 240, image: '' },
    { id: 'w_h_5', category: 'Hair Services', name: 'Hair Botox', description: 'Deep conditioning and restoration.', price: 15000, durationMin: 90, image: '' },
    { id: 'w_h_6', category: 'Hair Services', name: 'Perming', description: 'Permanent curls/waves.', price: 8000, durationMin: 120, image: '' },
    { id: 'w_h_7', category: 'Hair Services', name: 'Full Hair Dye (Shoulder)', description: 'Full color for shoulder length.', price: 5000, durationMin: 90, image: '' },
    { id: 'w_h_8', category: 'Hair Services', name: 'Full Hair Dye (Mid Back)', description: 'Full color for mid-back length.', price: 15000, durationMin: 120, image: '' },
    { id: 'w_h_9', category: 'Hair Services', name: 'Hair Streaks (Shoulder)', description: 'Highlights for shoulder length.', price: 15000, durationMin: 120, image: '' },
    { id: 'w_h_10', category: 'Hair Services', name: 'Hair Streaks (Mid Back)', description: 'Highlights for mid-back length.', price: 35000, durationMin: 150, image: '' },
    { id: 'w_h_11', category: 'Hair Services', name: 'Highlights/Lowlights', description: 'Full service dimension.', price: 35000, durationMin: 180, image: '' },
    { id: 'w_h_12', category: 'Hair Services', name: 'Balayage/Ombre', description: 'Hand-painted color technique.', price: 14499, durationMin: 180, image: '' },
    { id: 'w_h_13', category: 'Hair Services', name: 'Micro Weaving/Baby Lights', description: 'Subtle, fine highlights.', price: 15499, durationMin: 180, image: '' },
    { id: 'w_h_14', category: 'Hair Services', name: 'Permanent Hair Extensions', description: 'Long-lasting length and volume.', price: 175000, durationMin: 300, image: '' },
    { id: 'w_h_15', category: 'Hair Services', name: 'Temporary Hair Extensions', description: 'Clip-ins or tape-ins.', price: 25000, durationMin: 60, image: '' },
    { id: 'w_h_16', category: 'Hair Services', name: 'Hair High Frequency', description: 'Scalp treatment.', price: 3000, durationMin: 30, image: '' },
    { id: 'w_h_17', category: 'Hair Services', name: 'Baby Hair Cut', description: 'Gentle cut for little ones.', price: 1500, durationMin: 30, image: '' },
    { id: 'w_h_18', category: 'Hair Services', name: 'Specialized Styling (Crimpie)', description: 'Textured crimped style.', price: 3000, durationMin: 45, image: '' },
    { id: 'w_h_19', category: 'Hair Services', name: 'Specialized Styling (Iron Curls)', description: 'Defined curls.', price: 2500, durationMin: 45, image: '' },
    { id: 'w_h_20', category: 'Hair Services', name: 'Junior Artist Haircut', description: 'Cut by junior stylist.', price: 1999, durationMin: 45, image: '' },
    { id: 'w_h_21', category: 'Hair Services', name: 'Hair Massage with Oil', description: 'Relaxing scalp massage.', price: 1000, durationMin: 30, image: '' },
    { id: 'w_h_22', category: 'Hair Services', name: 'Blow Dry', description: 'Wash and blow out.', price: 2000, durationMin: 45, image: '' },
    { id: 'w_h_23', category: 'Hair Services', name: 'Iron Setting', description: 'Straightening or styling.', price: 2000, durationMin: 30, image: '' },
    { id: 'w_h_24', category: 'Hair Services', name: 'Hair Styling Simple', description: 'Basic updos or styling.', price: 2000, durationMin: 45, image: '' },

    // Skin & Facial
    { id: 'w_s_1', category: 'Skin and Facial Services', name: 'Hydra with Gold', description: 'Premium hydration facial.', price: 8999, durationMin: 75, image: '' },
    { id: 'w_s_2', category: 'Skin and Facial Services', name: 'Whitening Facial THALGO', description: 'Brightening marine treatment.', price: 8000, durationMin: 60, image: '' },
    { id: 'w_s_3', category: 'Skin and Facial Services', name: 'Hydra Facial GOLD', description: 'Without polisher.', price: 10000, durationMin: 60, image: '' },
    { id: 'w_s_4', category: 'Skin and Facial Services', name: 'Cleansing for Teenagers', description: 'Gentle Janssen cleansing.', price: 3000, durationMin: 45, image: '' },
    { id: 'w_s_5', category: 'Skin and Facial Services', name: 'Whitening Facial JANSSEN', description: 'Professional whitening.', price: 5000, durationMin: 60, image: '' },
    { id: 'w_s_6', category: 'Skin and Facial Services', name: 'Whitening Facial Special', description: 'Standard whitening treatment.', price: 3000, durationMin: 60, image: '' },
    { id: 'w_s_7', category: 'Skin and Facial Services', name: 'Polisher Gold', description: 'Gold skin polish.', price: 1500, durationMin: 30, image: '' },
    { id: 'w_s_8', category: 'Skin and Facial Services', name: 'Polisher Saffron', description: 'Saffron infused polish.', price: 2000, durationMin: 30, image: '' },
    { id: 'w_s_9', category: 'Skin and Facial Services', name: 'Polisher JANSSEN', description: 'Premium Janssen polish.', price: 3000, durationMin: 30, image: '' },

    // Makeup
    { id: 'w_m_1', category: 'Makeup Services', name: 'Nikkah/Engagement (Junior)', description: 'By Junior Artist.', price: 19999, durationMin: 90, image: '' },
    { id: 'w_m_2', category: 'Makeup Services', name: 'Nikkah/Engagement (Senior)', description: 'By Senior Artist.', price: 24999, durationMin: 90, image: '' },
    { id: 'w_m_3', category: 'Makeup Services', name: 'Nikkah/Engagement (Signature)', description: 'By Signature Artist.', price: 39999, durationMin: 120, image: '' },
    { id: 'w_m_4', category: 'Makeup Services', name: 'Bridal Barat/Walima (Junior)', description: 'By Junior Artist.', price: 24500, durationMin: 120, image: '' },
    { id: 'w_m_5', category: 'Makeup Services', name: 'Bridal Barat/Walima (Senior)', description: 'By Senior Artist.', price: 49999, durationMin: 120, image: '' },
    { id: 'w_m_6', category: 'Makeup Services', name: 'Bridal Barat/Walima (Signature)', description: 'By Signature Artist.', price: 79999, durationMin: 150, image: '' },
    { id: 'w_m_7', category: 'Makeup Services', name: 'Signature Party Makeup', description: 'High glam party look.', price: 10000, durationMin: 60, image: '' },
    { id: 'w_m_8', category: 'Makeup Services', name: 'Model Party Makeup', description: 'Editorial style.', price: 10000, durationMin: 60, image: '' },
    { id: 'w_m_9', category: 'Makeup Services', name: 'Signature Model Party', description: 'Premium model look.', price: 20000, durationMin: 90, image: '' },

    // Nail
    { id: 'w_n_1', category: 'Nail Services', name: 'Manicure with Paraffin', description: 'Softening treatment.', price: 2000, durationMin: 45, image: '' },
    { id: 'w_n_2', category: 'Nail Services', name: 'Pedicure with Paraffin', description: 'Softening foot treatment.', price: 2000, durationMin: 45, image: '' },
    { id: 'w_n_3', category: 'Nail Services', name: 'THALGO Manicure', description: 'Marine spa manicure.', price: 2500, durationMin: 60, image: '' },
    { id: 'w_n_4', category: 'Nail Services', name: 'THALGO Pedicure', description: 'Marine spa pedicure.', price: 2500, durationMin: 60, image: '' },
    { id: 'w_n_5', category: 'Nail Services', name: 'JANSSEN Manicure', description: 'Premium skincare manicure.', price: 2000, durationMin: 60, image: '' },
    { id: 'w_n_6', category: 'Nail Services', name: 'JANSSEN Pedicure', description: 'Premium skincare pedicure.', price: 2000, durationMin: 60, image: '' },
    { id: 'w_n_7', category: 'Nail Services', name: 'Gel Nail Paint UV', description: 'Long lasting color.', price: 3000, durationMin: 45, image: '' },
    { id: 'w_n_8', category: 'Nail Services', name: 'Acrylic Nails', description: 'Full set.', price: 8000, durationMin: 90, image: '' },
    { id: 'w_n_9', category: 'Nail Services', name: 'Nail Extensions (2 weeks)', description: 'Temporary extensions.', price: 4000, durationMin: 60, image: '' },

    // Eyelash
    { id: 'w_e_1', category: 'Eyelash Services', name: 'Artificial Eyelash', description: 'Strip lash application.', price: 999, durationMin: 15, image: '' },
    { id: 'w_e_2', category: 'Eyelash Services', name: 'Eyelash Application', description: 'Service only.', price: 499, durationMin: 15, image: '' },
    { id: 'w_e_3', category: 'Eyelash Services', name: 'Eyelash Extensions', description: 'Semi-permanent extensions.', price: 10000, durationMin: 120, image: '' },
    { id: 'w_e_4', category: 'Eyelash Services', name: 'Eyelash Refilling', description: 'Fill in for extensions.', price: 4499, durationMin: 60, image: '' },
    { id: 'w_e_5', category: 'Eyelash Services', name: 'Eyelash Removal', description: 'Safe removal.', price: 3499, durationMin: 30, image: '' },
    { id: 'w_e_6', category: 'Eyelash Services', name: 'Eyelash Lifting', description: 'Natural lash lift.', price: 5999, durationMin: 60, image: '' },

    // Waxing
    { id: 'w_w_1', category: 'Waxing Services', name: 'Full Face Wax', description: 'Includes mask.', price: 1500, durationMin: 30, image: '' },
    { id: 'w_w_2', category: 'Waxing Services', name: 'Face Side Wax', description: 'Sideburns/cheeks.', price: 650, durationMin: 15, image: '' },
    { id: 'w_w_3', category: 'Waxing Services', name: 'Nose Wax', description: 'Quick nose hair removal.', price: 200, durationMin: 10, image: '' },
    { id: 'w_w_4', category: 'Waxing Services', name: 'Arm Wax Full (RICA)', description: 'Premium wax.', price: 1800, durationMin: 30, image: '' },
    { id: 'w_w_5', category: 'Waxing Services', name: 'Leg Wax Full (Honey)', description: 'Smooth legs.', price: 3000, durationMin: 45, image: '' },
    { id: 'w_w_6', category: 'Waxing Services', name: 'Full Body Wax (Honey)', description: 'Complete body.', price: 7000, durationMin: 120, image: '' },
    { id: 'w_w_7', category: 'Waxing Services', name: 'Feet Wax', description: 'Feet only.', price: 300, durationMin: 15, image: '' },
    { id: 'w_w_8', category: 'Waxing Services', name: 'Bikini Wax', description: 'Standard bikini.', price: 1200, durationMin: 30, image: '' },
    { id: 'w_w_9', category: 'Waxing Services', name: 'Belly Wax', description: 'Stomach area.', price: 1200, durationMin: 20, image: '' },
    { id: 'w_w_10', category: 'Waxing Services', name: 'Hands Wax', description: 'Hands only.', price: 300, durationMin: 15, image: '' },
    { id: 'w_w_11', category: 'Waxing Services', name: 'Under Arms Wax', description: 'Quick cleanup.', price: 650, durationMin: 15, image: '' },
    { id: 'w_w_12', category: 'Waxing Services', name: 'Half Arm Wax', description: 'Up to elbow.', price: 850, durationMin: 20, image: '' },
    { id: 'w_w_13', category: 'Waxing Services', name: 'Half Legs Wax', description: 'Up to knee.', price: 1350, durationMin: 30, image: '' },

    // Threading
    { id: 'w_t_1', category: 'Threading Services', name: 'Eyebrows Threading', description: 'Shape and clean.', price: 200, durationMin: 15, image: '' },
    { id: 'w_t_2', category: 'Threading Services', name: 'Upper Lips Threading', description: 'Quick removal.', price: 100, durationMin: 10, image: '' },
    { id: 'w_t_3', category: 'Threading Services', name: 'Face Threading (with Brows)', description: 'Full face cleanup.', price: 800, durationMin: 30, image: '' },
    { id: 'w_t_4', category: 'Threading Services', name: 'Face Threading (no Brows)', description: 'Full face cleanup.', price: 500, durationMin: 30, image: '' },

    // Massage
    { id: 'w_ma_1', category: 'Massage and Spa Services', name: 'Full Body Spa Service', description: '60 minutes relaxation.', price: 20000, durationMin: 60, image: '' },
    { id: 'w_ma_2', category: 'Massage and Spa Services', name: 'Thai Massage', description: '60 minutes traditional.', price: 15000, durationMin: 60, image: '' },
    { id: 'w_ma_3', category: 'Massage and Spa Services', name: 'Moroccan Massage', description: '60 minutes.', price: 20000, durationMin: 60, image: '' },
    { id: 'w_ma_4', category: 'Massage and Spa Services', name: 'Hot Stone Spa', description: '60 minutes heated stone.', price: 20000, durationMin: 60, image: '' },
    { id: 'w_ma_5', category: 'Massage and Spa Services', name: 'Body Exfoliation with Massage', description: 'Scrub and rub.', price: 10000, durationMin: 60, image: '' },

    // Special / Mehndi / Other
    { id: 'w_sp_1', category: 'Special Services', name: 'Henna Single Side', description: 'Mehndi application one side.', price: 500, durationMin: 30, image: '' },
    { id: 'w_sp_2', category: 'Special Services', name: 'Hair Keratin (Short)', description: 'Full price starting.', price: 10999, durationMin: 120, image: '' },
    { id: 'w_sp_3', category: 'Special Services', name: 'Janssen Facial', description: 'Classic facial.', price: 5000, durationMin: 60, image: '' },
    { id: 'w_sp_4', category: 'Special Services', name: 'Whitening Facial Simple', description: 'Basic whitening.', price: 2000, durationMin: 45, image: '' },
    { id: 'w_sp_5', category: 'Special Services', name: 'Hydra Facial Simple', description: 'Basic hydra.', price: 6000, durationMin: 60, image: '' },
];

export const STAFF: Staff[] = [
  { id: 's1', name: 'Alex Rivera', role: 'Master Barber', specialty: 'Fades & Razor', rating: 4.9, image: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&q=80', active: true },
  { id: 's2', name: 'Sarah Chen', role: 'Senior Stylist', specialty: 'Color & Cuts', rating: 5.0, image: 'https://images.unsplash.com/photo-1595956553066-feb4312be236?auto=format&fit=crop&q=80', active: true },
  { id: 's3', name: 'Mike Ross', role: 'Barber', specialty: 'Classic Cuts', rating: 4.7, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80', active: true },
  { id: 's4', name: 'Emma Watson', role: 'Makeup Artist', specialty: 'Bridal', rating: 4.9, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80', active: true },
];

export const VOUCHERS: Voucher[] = [
  { id: 'v1', code: 'GOLD10', value: 10, type: 'percentage', description: '10% off your first luxury service' },
  { id: 'v2', code: 'GROOM20', value: 20, type: 'fixed', description: 'Rs. 20 off the Royal Grooming Package' },
];

export const SERVICE_VOUCHERS: ServiceVoucher[] = [
  // Womens Vouchers
  {
    id: 'sv1',
    title: 'Relaxation Spa Voucher',
    price: 1999,
    category: 'spa',
    validity: '90 days',
    perfectFor: 'Stress relief, birthday gifts',
    gender: 'womens',
    services: [
      'Dermacos Cleansing',
      'Face Polish',
      'Hand & Feet Massage',
      'Head Massage'
    ],
    image: 'https://i.pinimg.com/736x/43/f5/31/43f531fdd486460b39b201c73d5b42fd.jpg'
  },
  {
    id: 'sv2',
    title: 'Express Glow Voucher',
    price: 3500,
    category: 'face',
    validity: '60 days',
    perfectFor: 'Quick refresh before events',
    gender: 'womens',
    services: [
      'Whitening Facial',
      'Mini Manicure',
      'Mini Pedicure',
      'Eyebrow Threading'
    ],
    image: 'https://i.pinimg.com/736x/8d/c4/c0/8dc4c0047e0365f51ba8e7c74e2952d1.jpg'
  },
  {
    id: 'sv3',
    title: 'Sunday Special Voucher',
    price: 1999,
    category: 'face',
    validity: '90 days (Redeemable Sundays only)',
    perfectFor: 'Weekend self-care',
    gender: 'womens',
    services: [
      'Dermacos Whitening Facial',
      'Hand & Feet Polish',
      'Half Arms Wax',
      'Full Face Threading'
    ],
    image: 'https://i.pinimg.com/736x/b8/d7/6b/b8d76b7400e94b89e6abfe8fc1c0e176.jpg'
  },
  {
    id: 'sv4',
    title: 'Winter Glow Voucher',
    price: 3999,
    category: 'face',
    validity: '120 days (Winter season)',
    perfectFor: 'Seasonal glow-up',
    gender: 'womens',
    services: [
      'Whitening Facial',
      'Eyebrows & Upper Lips Threading',
      'Half Arm Wax',
      'Forehead Threading'
    ],
    image: 'https://i.pinimg.com/736x/df/83/15/df8315063b0a254f9ad10f6c1362399e.jpg'
  },
  {
    id: 'sv5',
    title: 'Smooth Hair Voucher',
    price: 6999,
    category: 'hair',
    validity: '90 days',
    perfectFor: 'Frizzy/damaged hair solution',
    gender: 'womens',
    services: [
      'Hair Keratin (Short Length)',
      'Hair Wash',
      'Blow Dry'
    ],
    image: 'https://i.pinimg.com/1200x/89/ba/71/89ba71fd314c863a808ce03ecd04e52b.jpg'
  },
  {
    id: 'sv6',
    title: 'Party Ready Voucher',
    price: 5999,
    category: 'hair',
    validity: '60 days',
    perfectFor: 'Weddings, parties, events',
    gender: 'womens',
    services: [
      'Party Makeup',
      'Hairstyling',
      'Eyelashes Application',
      'Simple Nail Color'
    ],
    image: 'https://i.pinimg.com/736x/3e/51/e5/3e51e50cf98db6a0462c7cd2500c885d.jpg'
  },
  {
    id: 'sv7',
    title: 'Hair Rejuvenation Voucher',
    price: 5999,
    category: 'hair',
    validity: '90 days',
    perfectFor: 'Damaged hair repair',
    gender: 'womens',
    services: [
      'Protein Hair Treatment',
      'Hair Cut',
      'Hair Wash'
    ],
    image: 'https://i.pinimg.com/736x/2a/73/6d/2a736d8616c96358688eeab6d1a085c0.jpg'
  },
  {
    id: 'sv8',
    title: 'Hydra Facial Voucher',
    price: 4999,
    category: 'face',
    validity: '90 days',
    perfectFor: 'Skin detox and glow',
    gender: 'womens',
    services: [
      'Oxygen & Omega 3 Facial',
      'Face Polisher',
      'LED Mask Treatment',
      'Simple Manicure & Pedicure'
    ],
    image: 'https://i.pinimg.com/736x/1a/eb/c8/1aebc869c07279823f66e6d35e8d5557.jpg'
  },
  {
    id: 'sv9',
    title: 'Wax & Thread Combo',
    price: 2500,
    category: 'essentials',
    validity: '60 days',
    perfectFor: 'Regular grooming maintenance',
    gender: 'womens',
    services: [
      'Full Face Threading',
      'Half Arms Wax',
      'Underarms Wax'
    ],
    image: 'https://i.pinimg.com/1200x/cd/ea/3f/cdea3f4248087bec89b66cda7a08df6b.jpg'
  },
  {
    id: 'sv10',
    title: 'Complete Beauty Voucher',
    price: 4999,
    category: 'spa',
    validity: '90 days',
    perfectFor: 'Full beauty makeover',
    gender: 'womens',
    services: [
      'Face & Half Arms Polish',
      'High Freq Treatment',
      'Whitening Mani & Pedi',
      'Neck, Shoulder & Back Massage',
      'Eyebrows & Nail Color'
    ],
    image: 'https://i.pinimg.com/736x/89/33/16/89331635e9661a7c43d64b020ddb2e28.jpg'
  },
  {
    id: 'sv11',
    title: 'Hydra Radiance Essential Facial',
    price: 4999,
    category: 'face',
    validity: 'Limited Time Offer',
    perfectFor: 'Deep cleansing and relaxation',
    gender: 'womens',
    services: [
      'Oxygen Facial',
      'Omega 3 Facial',
      'Face Polisher',
      'LED Mask Therapy',
      'Simple Manicure & Pedicure'
    ],
    image: 'https://i.pinimg.com/736x/cb/1d/af/cb1dafde466c5f541eafdca7d66a4fd8.jpg'
  },
  {
    id: 'sv12',
    title: 'Hydra Radiance Age-Defying Facial',
    price: 5999,
    category: 'face',
    validity: 'Limited Time Offer',
    perfectFor: 'Anti-aging and skin rejuvenation',
    gender: 'womens',
    services: [
      'Omega 3 Facial',
      'Anti-Aging Treatment',
      'Ultrasonic Cryotherapy Treatment',
      'LED Mask Therapy',
      'Face Polisher',
      'Simple Manicure & Pedicure'
    ],
    image: 'https://i.pinimg.com/736x/9f/72/b8/9f72b8342835d7773150ae88f48ccff6.jpg'
  },
  {
    id: 'sv13',
    title: 'Hydra Radiance Prime Facial',
    price: 6999,
    category: 'face',
    validity: 'Limited Time Offer',
    perfectFor: 'Ultimate hydration and glow',
    gender: 'womens',
    services: [
      'Hydra Prime Facial',
      'Omega 3 Facial',
      'All-in-One Face Polisher',
      'Simple Manicure & Pedicure'
    ],
    image: 'https://i.pinimg.com/1200x/4a/e0/5a/4ae05afed2956297a3618dba8f1ec6bf.jpg'
  },
  // Transferred Student Packages as Vouchers
  {
    id: 'sv_st_1',
    title: 'Student Deal 1',
    price: 3050,
    category: 'student',
    validity: 'Valid Student ID Required',
    perfectFor: 'Students',
    gender: 'womens',
    services: ['Hair Cut', 'Neck & Back Massage', 'French Nail Color', 'Blow Dry'],
    image: 'https://i.pinimg.com/736x/f1/ac/dd/f1acdde84a0405c8cf4f09321d7543f7.jpg'
  },
  {
    id: 'sv_st_2',
    title: 'Student Deal 2',
    price: 2599,
    category: 'student',
    validity: 'Valid Student ID Required',
    perfectFor: 'Students',
    gender: 'womens',
    services: ['Mani-Pedi + Deep Cleansing', 'Hand & Feet Polisher', 'Eyebrow Threading', 'Nail Color', 'Face Polisher'],
    image: 'https://i.pinimg.com/736x/a5/72/f6/a572f666ded32fd3070e2b9988ba7f48.jpg'
  },
  {
    id: 'sv_st_3',
    title: 'Student Deal 3',
    price: 2999,
    category: 'student',
    validity: 'Valid Student ID Required',
    perfectFor: 'Students',
    gender: 'womens',
    services: ['Full Arms Wax', 'Under Arms Wax', 'Half Legs Wax'],
    image: 'https://i.pinimg.com/736x/58/b2/79/58b279ccbf640cbe8d09d4bc16a78f3a.jpg'
  },
  {
    id: 'sv14',
    title: 'Fan-Favorite Service',
    price: 14999,
    category: 'essentials',
    validity: 'Limited Time Offer',
    perfectFor: 'Complete pampering',
    gender: 'womens',
    services: [
      'Full Body Scrub',
      'Full Body Polisher',
      'Full Body Massage (30 Minutes)',
      'Hydra Facial (with All Tools)',
      'Whitening Manicure & Pedicure',
      'Hair Wash',
      'Blowdry'
    ],
    image: 'https://i.pinimg.com/736x/76/ab/16/76ab16930ac08f2cd6ffc7bf68799548.jpg'
  },
  {
    id: 'sv15',
    title: 'Glamorous Party Makeover',
    price: 5999,
    category: 'essentials',
    validity: 'Limited Time Offer',
    perfectFor: 'Parties and Events',
    gender: 'womens',
    services: [
      'Professional Party Makeup',
      'Hair Styling',
      'Eye Lashes Application',
      'Simple Nail Color'
    ],
    image: 'https://i.pinimg.com/736x/41/be/c9/41bec9bec7934a1e39d522848112f9c2.jpg'
  },
  {
    id: 'sv16',
    title: 'Glam Glow Brightening Facial',
    price: 2999,
    category: 'essentials',
    validity: 'Limited Time Offer',
    perfectFor: 'Instant brightness and glow',
    gender: 'womens',
    services: [
      'Whitening Facial',
      'Face Polisher',
      'Neck Polisher',
      'Steam Treatment',
      'Hands & Feet Polisher'
    ],
    image: 'https://i.pinimg.com/736x/ab/84/02/ab840202e760516fceefc535cbb9739f.jpg'
  },
  {
    id: 'sv17',
    title: 'Wish Come True Facial Essentials',
    price: 1999,
    category: 'essentials',
    validity: 'Limited Time Offer',
    perfectFor: 'Quick skin refresh',
    gender: 'womens',
    services: [
      'Face Polisher',
      'Deep Cleansing',
      'Exfoliation',
      'Mud Mask',
      'Eyebrows & Upper Lips Shaping/Care'
    ],
    image: 'https://i.pinimg.com/736x/4c/86/51/4c865197492dab8dee704344034d9aa1.jpg'
  },
  {
    id: 'sv18',
    title: 'Rafale Glow & Relaxation Deal',
    price: 3499,
    category: 'face',
    validity: 'Limited Time Offer',
    perfectFor: 'Relaxation and Glow',
    gender: 'womens',
    services: [
      'Whitening Face Polisher',
      'Whitening Manicure & Pedicure',
      'Instant Glowing Facial',
      'Neck & Back Massage',
      'Eyebrows Threading'
    ],
    image: 'https://i.pinimg.com/736x/e0/46/7c/e0467ca43aaa92f3873ecbf6a4b3fa55.jpg'
  },
  {
    id: 'sv19',
    title: 'Premium Spa & Whitening Experience',
    price: 12000,
    category: 'face',
    validity: 'Limited Time Offer',
    perfectFor: 'Full Body Rejuvenation',
    gender: 'womens',
    services: [
      'Full Body Massage',
      'Full Body Scrub'
    ],
    image: 'https://i.pinimg.com/736x/58/b6/c2/58b6c2ccb07658efebf750c11779184e.jpg'
  },
  {
    id: 'sv20',
    title: 'Bridal Mehndi & Baraat Premium Package',
    price: 64999,
    category: 'face',
    validity: 'Limited Time Offer',
    perfectFor: 'Brides',
    gender: 'womens',
    services: [
      'Bridal Makeup (Mehndi & Baraat)',
      '3D Eye Lashes',
      'Whitening Facial',
      'Mehndi Application',
      'Dupatta Setting',
      'Threading (Two Parts)',
      'Whitening Manicure & Pedicure',
      'Jewellery Setting'
    ],
    image: 'https://i.pinimg.com/736x/ed/b1/e8/edb1e82dee9620dc7cb58f62a35cc6e5.jpg'
  },
  {
    id: 'sv21',
    title: 'Weekend Hair Revival',
    price: 3500,
    category: 'essentials',
    validity: 'Weekend Offer',
    perfectFor: 'Weekend Pampering',
    gender: 'womens',
    services: [
      'Hair Protein Treatment',
      'Head Wash',
      'Hair Cut',
      'Blow Dry'
    ],
    image: 'https://i.pinimg.com/736x/0c/29/aa/0c29aa6b45121c4c27c702aa5a541c6f.jpg'
  },
  {
    id: 'sv22',
    title: 'Spa & Beauty Refresh Deal',
    price: 1999,
    category: 'spa',
    validity: 'Limited Seasonal Offer',
    perfectFor: 'Relaxation',
    gender: 'womens',
    services: [
      'Darmacos Cleansing',
      'Face Polish',
      'Hand & Feet Massage',
      'Head Massage'
    ],
    image: 'https://i.pinimg.com/1200x/99/66/0d/99660dc0cf5aef086ff38b900f731822.jpg'
  },
  {
    id: 'sv23',
    title: 'Complete Bridal Makeover Package',
    price: 24999,
    category: 'face',
    validity: 'Limited Time',
    perfectFor: 'Brides',
    gender: 'womens',
    services: [
      'Bridal Makeup by Senior Makeup Artist',
      'Hairstyling',
      'Dupatta Setting',
      'Jewelry Setting',
      'Nail Paint',
      'Artificial Nails'
    ],
    image: 'https://i.pinimg.com/736x/7c/c7/d4/7cc7d4fc0ebce20ea81e8ae3ec1a4055.jpg'
  },

  // Mens Vouchers
  {
    id: 'mv1',
    title: 'Basic Grooming Voucher',
    price: 1500,
    category: 'essentials',
    validity: '60 days',
    perfectFor: 'Regular maintenance',
    gender: 'mens',
    services: ['Hair Cut', 'Beard Styling', 'Cleansing'],
    image: 'https://i.pinimg.com/736x/ff/27/94/ff2794c687ecfac5029ba3e6d3f3168f.jpg'
  },
  {
    id: 'mv2',
    title: 'Express Grooming Voucher',
    price: 2000,
    category: 'face',
    validity: '60 days',
    perfectFor: 'Quick refresh',
    gender: 'mens',
    services: ['Hair Cut', 'Beard', 'Face Polish', 'Hand Polish', 'Neck Polish', 'Styling'],
    image: 'https://i.pinimg.com/1200x/13/3c/3f/133c3f44ab59c1783ffad91fea26320c.jpg'
  },
  {
    id: 'mv3',
    title: 'Premium Grooming Voucher',
    price: 2699,
    category: 'hair',
    validity: '60 days',
    perfectFor: 'Complete grooming session',
    gender: 'mens',
    services: ['Hair Wash', 'Executive Haircut', 'Hair Styling', 'Hair Polish', 'Executive Beard', 'Black Heads Removal'],
    image: 'https://i.pinimg.com/1200x/f6/96/ca/f696ca0764ffdf918dcb9e0dbefa7289.jpg'
  },
  {
    id: 'mv4',
    title: 'Elite Grooming Voucher',
    price: 3499,
    category: 'face',
    validity: '60 days',
    perfectFor: 'Special occasions',
    gender: 'mens',
    services: ['Executive Haircut', 'Executive Beard', 'Hair Styling', 'Hair Polish', 'Face Polish', 'Neck Polish', 'Black Head Removal'],
    image: 'https://i.pinimg.com/736x/40/e0/cc/40e0ccb3017c4a53c5dca64ce1cd9d03.jpg'
  },
  {
    id: 'mv5',
    title: 'Azadi Deal Voucher',
    price: 1500,
    category: 'spa',
    validity: '60 days',
    perfectFor: 'Complete package at budget price',
    gender: 'mens',
    services: ['Haircut', 'Beard Styling', 'Facial', 'Manicure & Pedicure', 'Machine Massage'],
    image: 'https://i.pinimg.com/1200x/b6/6f/a9/b66fa92604a41523dcc70c11d8030ad7.jpg'
  }
];

export const TESTIMONIALS = [
  { id: 1, name: "James D.", text: "The precision on the fade is unmatched. True craftsmanship.", rating: 5 },
  { id: 2, name: "Maria S.", text: "My makeup looked flawless for hours. The studio is stunning.", rating: 5 },
  { id: 3, name: "Tom H.", text: "Classic barber vibes with a modern touch. Great whiskey too.", rating: 4 },
];

export const WOMENS_REVIEWS = [
  { id: 1, name: "Zobia Rizwan", text: "I had a great experience with Nabeela and Bano! They did facials, manicure, and pedicure for me and my sister. Their work was excellent especially the massage, which was super relaxing and calming.", rating: 5 },
  { id: 2, name: "Jannat", text: "I had my hair color done at Sumaira N Shan. Biggest salon in central park as well as all over in kasur. I came all the way from kasur. I heard very good comments about this salon and its woth it.💝", rating: 5 },
  { id: 3, name: "N I K", text: "I came here for cutting... mam sumaira did my haircut... it was exactly tht what I wanted... fully satisfied and highly recommended... excellent work 👍❤️🥳", rating: 5 },
  { id: 4, name: "Muhammad Amjad Akram", text: "I'm absolutely blown away by the exceptional service! Their team truly outdid themselves for my family's special occasions - bride service, mehndi, walima, and engagement.", rating: 5 },
  { id: 5, name: "Ameena Rana", text: "Got my nails and other services done from here I had a wonderful experience! The staff was friendly, professional, and made me feel completely at ease. All the services turned out exactly how I wanted.", rating: 5 },
  { id: 6, name: "Shahid Shan", text: "Baji Sumaira transformed my wife into a stunning bride, exceeding our expectations. Her signature makeup is truly magical – it's like a dream come true!", rating: 5 },
  { id: 7, name: "Sania Ishfaq", text: "The salon is clean, well-organized, and has a relaxing ambiance that makes you feel pampered from start to finish.", rating: 5 },
  { id: 8, name: "Aniqah Irfan", text: "Sumaira & Shan Salon is amazing! The team is professional and friendly.", rating: 5 },
  { id: 9, name: "Nuzba Imtiaz", text: "Very good and beautiful salon that has reasonable prices of every service.", rating: 5 },
  { id: 10, name: "Saher Sharif", text: "Very supportive staff dealing with clients is too good their staff's skill is outstanding ambiance was also elegant. Highly satisfied services💞", rating: 5 },
  { id: 11, name: "Aman Khaliq", text: "I visited the salon 3-4 times, got facial and meni pedi services. Staff was professional and humble. Especially Sonia has expertise in facial services.", rating: 5 },
  { id: 12, name: "Amna Ahmad", text: "I got my nails done by Sonia, and she did an incredible job. They turned out so beautifully, and she made sure to check with me at every step to see if I wanted any changes.", rating: 5 },
  { id: 13, name: "Alisha", text: "I got my hair cut and bridal makeup I am super satisfied. Sumaira has a magic in her hands when she made bride it's her life changing moment. Highely recommend", rating: 5 },
];

export const MENS_REVIEWS = [
  { id: 1, name: "Mahnoor Ahmad", text: "Highly recommended... good work👍👍", rating: 5 },
  { id: 2, name: "Tariq Ahmed", text: "Best salon of central Park 💕", rating: 5 },
  { id: 3, name: "Hamad Ali", text: "Very nice makeup", rating: 5 },
  { id: 4, name: "Rana Taimoor", text: "Thanks a lot 👍 well done bohat acha Kam ha", rating: 5 },
  { id: 5, name: "Abdul Moiz Pasha", text: "The service is nice and the haircuts are good.", rating: 5 }
];

export const MENS_PACKAGES: Package[] = [
  // TIERED GROOMING PACKAGES
  { 
    id: 'm_tg_1', 
    name: "Silver Men's Grooming Package", 
    price: 'RS. 9,999', 
    items: ['Head Wash', 'Hair Cut', 'Beard Trim', 'Face & Neck Polish', 'Hands Polish', 'Feet Polish', 'Black Head Removal', 'White Head Removal', 'SB Face Facial', 'Styling', 'Complete Makeover'], 
    category: 'TIERED GROOMING PACKAGES',
    image: 'https://i.pinimg.com/1200x/b6/c2/94/b6c2946c5f917518facffacc6d8b527f.jpg'
  },
  { 
    id: 'm_tg_2', 
    name: "Gold Men's Grooming Package", 
    price: 'RS. 16,999', 
    items: ['Hair Wash', 'Hair Cut', 'Beard Cut', 'Face Polish', 'Neck Polish', 'Hand Polish', 'Natural Life Face Facial', 'Feet Polish', 'Manicure', 'Pedicure', 'Black Head + White Head Removal', 'Styling', 'Complete Makeover'], 
    category: 'TIERED GROOMING PACKAGES',
    image: 'https://i.pinimg.com/1200x/10/61/cf/1061cf66635bfc98c404817dd0111b69.jpg'
  },
  { 
    id: 'm_tg_3', 
    name: "Platinum Men's Grooming Package", 
    price: 'RS. 24,999', 
    items: ['Head Wash', 'Hair Cut', 'Beard Cut', 'Exfoliation', 'Hydra Facial', 'Face Polish', 'Neck Polish', 'Hand Polish', 'Feet Polish', 'Manicure', 'Pedicure', 'Black Head White Head Removal', 'Styling', 'Complete Makeover'], 
    category: 'TIERED GROOMING PACKAGES',
    image: 'https://i.pinimg.com/1200x/58/a3/8e/58a38e86c1a50b86008e790c70c2a65c.jpg'
  },

  // THEMED PACKAGES
  { 
    id: 'm_tp_1', 
    name: 'Grooming Package', 
    price: 'RS. 2,000', 
    items: ['Head Wash', 'Hair Cut', 'Beard Trim', 'Manicure', 'Pedicure'], 
    category: 'THEMED PACKAGES',
    image: 'https://i.pinimg.com/736x/7f/00/ef/7f00efd863dae2715380b097126bd3dd.jpg'
  },
  { 
    id: 'm_tp_2', 
    name: 'Hydra Facial Package', 
    price: 'RS. 6,000', 
    items: ['Hydra Facial with Serums', 'Haircut', 'Beard', 'Manicure', 'Pedicure'], 
    category: 'THEMED PACKAGES',
    image: 'https://i.pinimg.com/736x/e5/90/20/e59020514c71bfcfd2b743da0531234f.jpg'
  },
  { 
    id: 'm_tp_3', 
    name: 'Luxury Spa Package', 
    price: 'RS. 10,000', 
    items: ['Hydra Facial & Facial', 'Manicure', 'Pedicure', 'Full Body Massage'], 
    category: 'THEMED PACKAGES',
    image: 'https://i.pinimg.com/736x/6d/a6/1e/6da61e55a8b1e7f0a72bf483c8a9d285.jpg'
  },
  { 
    id: 'm_tp_4', 
    name: 'Ultimate Relaxation Package', 
    price: 'RS. 13,000', 
    items: ['Haircut', 'Beard Grooming', 'Dermacos Facial', 'Manicure', 'Pedicure', 'Relaxing Body Massage'], 
    category: 'THEMED PACKAGES',
    image: 'https://i.pinimg.com/1200x/43/10/14/4310145767f644efb6230bfa8724165f.jpg'
  },

  // EXCLUSIVE DEALS
  { 
    id: 'm_ed_1', 
    name: 'Exclusive Deal 1', 
    price: 'RS. 1,500', 
    items: ['Hair Cut', 'Beard', 'Cleansing', 'Styling'], 
    category: 'EXCLUSIVE DEALS',
    image: 'https://i.pinimg.com/1200x/a5/de/6a/a5de6a30b9baff01da0355a694255276.jpg'
  },
  { 
    id: 'm_ed_2', 
    name: 'Exclusive Deal 2', 
    price: 'RS. 2,000', 
    items: ['Hair Cut', 'Beard', 'Face Polish', 'Hand Polish', 'Neck Polish', 'Styling'], 
    category: 'EXCLUSIVE DEALS',
    image: 'https://i.pinimg.com/736x/7e/d9/4d/7ed94d23006186cc8c05c1128e074b3d.jpg'
  },
  { 
    id: 'm_ed_3', 
    name: 'Exclusive Deal 3', 
    price: 'On Request', 
    items: ['Hair Cut', 'Beard', 'Hair Wash', 'Hair Polish', 'Nose Strip (Black Heads)'], 
    category: 'EXCLUSIVE DEALS',
    image: 'https://i.pinimg.com/1200x/c3/83/d6/c383d69dda1e931126d4c005e08d36d7.jpg'
  },
];

export const WOMENS_PACKAGES: Package[] = [
  // Bridal & Wedding
  { 
    id: 'wp_b_1', 
    name: 'Bridal Day Package', 
    price: 'RS. 24,999', 
    items: ['Bridal Makeup (Senior)', 'Hairstyle', 'Dupatta Setting', 'Jewelry Setting', 'Nail Paint', 'Artificial Nails'], 
    category: 'Bridal & Wedding Package',
    image: 'https://i.pinimg.com/1200x/5d/64/60/5d64602db0e3195874884f7627070525.jpg'
  },
  { 
    id: 'wp_b_2', 
    name: 'Mehndi & Barat Package', 
    price: 'RS. 64,999', 
    items: ['Mehndi & Barat Makeup', '3D Eye Lashes', 'Whitening Facial', 'Mehndi Application', 'Dupatta Setting', 'Threading', 'Whitening Mani & Pedi'], 
    category: 'Bridal & Wedding Package',
    image: 'https://i.pinimg.com/736x/c1/c7/d4/c1c7d4262622ff2a481dff263facd3dc.jpg'
  },
  { 
    id: 'wp_b_3', 
    name: 'Full Wedding Package', 
    price: 'RS. 49,999', 
    items: ['3 Days Makeup (Jr. Artist)', 'Whitening Facial & Face Polish', 'Arm & Feet Polisher', 'Moroccan Mani-Pedi', 'Two Part Threading', 'Nails & Paint', 'Hair & Dupatta Setting', 'Head Massage'], 
    category: 'Bridal & Wedding Package',
    image: 'https://i.pinimg.com/1200x/42/35/64/4235644caf7be96a191352e1f41edbd5.jpg'
  },
  { 
    id: 'wp_b_4', 
    name: 'Pre-Bridal Gold Package', 
    price: 'On Request', 
    items: ['Spa Manicure & Pedicure', 'Ultra Face Glow', 'Face Polisher', 'Threading'], 
    category: 'Bridal & Wedding Package',
    image: 'https://i.pinimg.com/1200x/da/f4/f9/daf4f96c230836e9763641c880b57e3a.jpg'
  },
  { 
    id: 'wp_b_5', 
    name: 'Pre-Bridal Platinum', 
    price: 'On Request', 
    items: ['All Gold Services', 'SNS Glow Facial', 'Hair Trim & Protein Treatment', 'Full Body Scrub & Wax', 'Arms & Legs Polisher', 'Acrylic Nails', 'Mehndi Application'], 
    category: 'Bridal & Wedding Package',
    image: 'https://i.pinimg.com/736x/67/cb/7b/67cb7b2e2432088a873e09c7fe61936f.jpg'
  },

  // Day Specific
  { 
    id: 'wp_d_1', 
    name: 'Mon-Tue Mega Deal', 
    price: 'RS. 2,999', 
    items: ['Mini Facial & Face Glow', 'Exfoliation', 'Shoulder, Face & Feet Massage', 'Hair Trimming', 'Half Arms Wax', 'Mini Mani-Pedi', 'Hand & Feet Polisher'], 
    category: 'Day Specific Deals',
    image: 'https://i.pinimg.com/736x/62/1f/f4/621ff4bf9038dc441c1d9fdfe2eef9bb.jpg'
  },
  { 
    id: 'wp_d_2', 
    name: 'Friday Special', 
    price: 'RS. 5,500', 
    items: ['Jansense Whitening Facial', 'Exfoliation', 'Head Massage', 'Hand Polish'], 
    category: 'Day Specific Deals',
    image: 'https://i.pinimg.com/736x/0e/8b/64/0e8b640f2a63f1397c45d50e56d29dd8.jpg'
  },
  { 
    id: 'wp_d_3', 
    name: 'Saturday-Sunday Deal', 
    price: 'RS. 4,000', 
    items: ['Whitening Facial', 'Head Wash', 'Hair Cut (Proper)', 'Blow Dry', 'Mini Mani-Pedi', 'Hand & Feet Polisher'], 
    category: 'Day Specific Deals',
    image: 'https://i.pinimg.com/736x/79/7f/f5/797ff505a540edec23da7fb8c39e2c89.jpg'
  },
  { 
    id: 'wp_d_4', 
    name: 'Weekends Deal', 
    price: 'RS. 3,500', 
    items: ['Hair Protein Treatment', 'Head Wash', 'Hair Cut', 'Blow Dry'], 
    category: 'Day Specific Deals',
    image: 'https://i.pinimg.com/736x/6c/46/8e/6c468ec21c5ef5c990b450829f02aadf.jpg'
  },

  // Premium SPA
  { 
    id: 'wp_s_1', 
    name: 'Fateh Spa Package', 
    price: 'RS. 9,999', 
    items: ['Full Body Scrub', 'Full Body Massage (30 min)', 'Hydra Facial (All Tools)', 'Whitening Mani & Pedi', 'Hair Wash & Blowdry'], 
    category: 'Premium SPA Package',
    image: 'https://i.pinimg.com/736x/f8/a4/be/f8a4be723372a672a93896e2478a1a75.jpg'
  },
  { 
    id: 'wp_s_2', 
    name: 'Luxury Spa Package', 
    price: 'RS. 14,999', 
    items: ['Full Body Scrub & Polisher', 'Full Body Massage (30 min)', 'Hydra Facial (All Tools)', 'Whitening Mani & Pedi', 'Hair Wash & Blowdry'], 
    category: 'Premium SPA Package',
    image: 'https://i.pinimg.com/736x/17/76/49/177649cd815a3af7439c97518e911b4a.jpg'
  },
  { 
    id: 'wp_s_3', 
    name: 'Mirrchi Glow Package', 
    price: 'RS. 4,499', 
    items: ['Whitening Face Polisher', 'Instant Glowing Facial', 'Whitening Mani & Pedi', 'Neck & Back Massage', 'Eyebrows Threading', 'Hydro Jelly Mask'], 
    category: 'Premium SPA Package',
    image: 'https://i.pinimg.com/736x/a0/94/5f/a0945f28fe4bd7b14ca38358bc79c45a.jpg'
  },

  // Winter Special
  { 
    id: 'wp_w_1', 
    name: 'Winter Glow 1', 
    price: 'RS. 1,999', 
    items: ['Mini Facial', 'Face Polisher', 'Eyebrow Threading', 'Upper Lip'], 
    category: 'Winter Special Series',
    image: 'https://i.pinimg.com/736x/ad/6b/c6/ad6bc6f90d4cca942464adfce48fbdc6.jpg'
  },
  { 
    id: 'wp_w_2', 
    name: 'Winter Glow 2', 
    price: 'RS. 5,999', 
    items: ['Whitening Facial', 'Full Arms Wax', 'Half Legs Wax', 'Manicure', 'Pedicure'], 
    category: 'Winter Special Series',
    image: 'https://i.pinimg.com/736x/d4/df/cb/d4dfcb8f24e7178d5afd150b0c87b507.jpg'
  },
  { 
    id: 'wp_w_3', 
    name: 'Winter Glow 3', 
    price: 'RS. 12,999', 
    items: ['Hydra Facial', 'Full Body Wax', 'Spa Manicure', 'Spa Pedicure', 'Hair Treatment'], 
    category: 'Winter Special Series',
    image: 'https://i.pinimg.com/736x/ed/24/3d/ed243db4dd594846eb63b3bc2eba5e43.jpg'
  },

  // Other Deals
  { 
    id: 'wp_o_1', 
    name: 'Classic Whitening', 
    price: 'RS. 4,999', 
    items: ['Face Polisher & High Freq', 'Brushing Peeling', 'Half Arms Polisher', 'Whitening Mani & Pedi', 'Massage (Neck, Shoulder, Back)', 'Threading & Nail Color'], 
    category: 'Other Deals',
    image: 'https://i.pinimg.com/1200x/b4/22/96/b4229613b2be8e855312a68c12f6943b.jpg'
  },
  { 
    id: 'wp_o_2', 
    name: 'Happy Hour Mazydaar', 
    price: 'RS. 2,999', 
    items: ['Dermacos Whitening Facial', 'Whitening Glow Polisher', 'Whitening Mani & Pedi', 'Straight Hair Trim', 'Half Arm Wax', 'Threading (Brows & Lip)'], 
    category: 'Other Deals',
    image: 'https://i.pinimg.com/736x/2e/86/88/2e86880e65a1776f8a05d6eba492f42e.jpg'
  },
  { 
    id: 'wp_o_3', 
    name: 'Nailed It Deal', 
    price: 'RS. 1,799', 
    items: ['Nail Application', 'Nail Foiling (Hands & Feet)', 'Nail Buffering', 'Nail Color (Glitter)', 'Standard Nail Color'], 
    category: 'Other Deals',
    image: 'https://i.pinimg.com/736x/93/e6/5a/93e65a6954195f9078a8a9ca9900ce27.jpg'
  },
];
