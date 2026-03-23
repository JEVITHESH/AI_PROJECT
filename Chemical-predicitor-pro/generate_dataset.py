import json
import random

# Define a larger set of chemicals to ensure >2000 unique combinations
chemicals = [
    # Strong Acids
    {"name": "Hydrochloric Acid", "category": "Strong Acid", "ph": 1.0, "state": "Liquid", "formula": "HCl", "reactivity": "High"},
    {"name": "Sulfuric Acid", "category": "Strong Acid", "ph": 0.5, "state": "Liquid", "formula": "H2SO4", "reactivity": "High"},
    {"name": "Nitric Acid", "category": "Strong Acid / Oxidizer", "ph": 1.0, "state": "Liquid", "formula": "HNO3", "reactivity": "High"},
    {"name": "Hydrobromic Acid", "category": "Strong Acid", "ph": 1.0, "state": "Liquid", "formula": "HBr", "reactivity": "High"},
    {"name": "Hydroiodic Acid", "category": "Strong Acid", "ph": 1.0, "state": "Liquid", "formula": "HI", "reactivity": "High"},
    {"name": "Perchloric Acid", "category": "Strong Acid / Oxidizer", "ph": 0.1, "state": "Liquid", "formula": "HClO4", "reactivity": "Very High"},

    # Weak Acids
    {"name": "Acetic Acid", "category": "Weak Acid", "ph": 2.5, "state": "Liquid", "formula": "CH3COOH", "reactivity": "Medium"},
    {"name": "Phosphoric Acid", "category": "Weak Acid", "ph": 1.5, "state": "Liquid", "formula": "H3PO4", "reactivity": "Medium"},
    {"name": "Citric Acid", "category": "Weak Acid", "ph": 2.2, "state": "Solid", "formula": "C6H8O7", "reactivity": "Low"},
    {"name": "Formic Acid", "category": "Weak Acid", "ph": 2.3, "state": "Liquid", "formula": "CH2O2", "reactivity": "Medium"},
    {"name": "Lactic Acid", "category": "Weak Acid", "ph": 2.4, "state": "Liquid", "formula": "C3H6O3", "reactivity": "Low"},
    {"name": "Oxalic Acid", "category": "Weak Acid", "ph": 1.3, "state": "Solid", "formula": "C2H2O4", "reactivity": "Medium"},
    {"name": "Benzoic Acid", "category": "Weak Acid", "ph": 2.8, "state": "Solid", "formula": "C7H6O2", "reactivity": "Low"},
    {"name": "Hydrofluoric Acid", "category": "Weak Acid / Toxic", "ph": 3.0, "state": "Liquid", "formula": "HF", "reactivity": "High"},

    # Strong Bases
    {"name": "Sodium Hydroxide", "category": "Strong Base", "ph": 14.0, "state": "Solid", "formula": "NaOH", "reactivity": "High"},
    {"name": "Potassium Hydroxide", "category": "Strong Base", "ph": 13.5, "state": "Solid", "formula": "KOH", "reactivity": "High"},
    {"name": "Lithium Hydroxide", "category": "Strong Base", "ph": 13.0, "state": "Solid", "formula": "LiOH", "reactivity": "High"},
    {"name": "Barium Hydroxide", "category": "Strong Base", "ph": 13.0, "state": "Solid", "formula": "Ba(OH)2", "reactivity": "High"},
    {"name": "Calcium Hydroxide", "category": "Strong Base", "ph": 12.4, "state": "Solid", "formula": "Ca(OH)2", "reactivity": "Medium"},

    # Weak Bases
    {"name": "Ammonia", "category": "Weak Base", "ph": 11.5, "state": "Liquid", "formula": "NH3", "reactivity": "Medium"},
    {"name": "Sodium Carbonate", "category": "Weak Base", "ph": 11.0, "state": "Solid", "formula": "Na2CO3", "reactivity": "Medium"},
    {"name": "Sodium Bicarbonate", "category": "Weak Base", "ph": 8.5, "state": "Solid", "formula": "NaHCO3", "reactivity": "Low"},
    {"name": "Magnesium Hydroxide", "category": "Weak Base", "ph": 10.5, "state": "Solid", "formula": "Mg(OH)2", "reactivity": "Low"},
    {"name": "Sodium Hypochlorite", "category": "Strong Base / Oxidizer", "ph": 11.0, "state": "Liquid", "formula": "NaClO", "reactivity": "High"},

    # Flammables
    {"name": "Ethanol", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "C2H5OH", "reactivity": "Medium"},
    {"name": "Methanol", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "CH3OH", "reactivity": "Medium"},
    {"name": "Isopropanol", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "C3H8O", "reactivity": "Medium"},
    {"name": "Acetone", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "C3H6O", "reactivity": "Medium"},
    {"name": "Benzene", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "C6H6", "reactivity": "Medium"},
    {"name": "Toluene", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "C7H8", "reactivity": "Medium"},
    {"name": "Xylenes", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "C8H10", "reactivity": "Medium"},
    {"name": "Diethyl Ether", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "(C2H5)2O", "reactivity": "High"},
    {"name": "Gasoline", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "Mix", "reactivity": "Medium"},
    {"name": "Kerosene", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "Mix", "reactivity": "Medium"},
    {"name": "Acetonitrile", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "CH3CN", "reactivity": "Medium"},
    {"name": "Ethyl Acetate", "category": "Flammable Liquid", "ph": 7.0, "state": "Liquid", "formula": "C4H8O2", "reactivity": "Medium"},

    # Oxidizers
    {"name": "Hydrogen Peroxide", "category": "Oxidizer", "ph": 4.5, "state": "Liquid", "formula": "H2O2", "reactivity": "High"},
    {"name": "Potassium Permanganate", "category": "Oxidizer", "ph": 7.0, "state": "Solid", "formula": "KMnO4", "reactivity": "High"},
    {"name": "Sodium Nitrate", "category": "Oxidizer", "ph": 7.0, "state": "Solid", "formula": "NaNO3", "reactivity": "Medium"},
    {"name": "Potassium Nitrate", "category": "Oxidizer", "ph": 7.0, "state": "Solid", "formula": "KNO3", "reactivity": "Medium"},
    {"name": "Ammonium Nitrate", "category": "Oxidizer", "ph": 5.0, "state": "Solid", "formula": "NH4NO3", "reactivity": "High"},
    {"name": "Potassium Chlorate", "category": "Oxidizer", "ph": 7.0, "state": "Solid", "formula": "KClO3", "reactivity": "Very High"},
    {"name": "Sodium Chlorite", "category": "Oxidizer", "ph": 11.0, "state": "Solid", "formula": "NaClO2", "reactivity": "High"},

    # Water-Reactivs
    {"name": "Sodium Metal", "category": "Water-Reactive", "ph": 7.0, "state": "Solid", "formula": "Na", "reactivity": "Very High"},
    {"name": "Potassium Metal", "category": "Water-Reactive", "ph": 7.0, "state": "Solid", "formula": "K", "reactivity": "Very High"},
    {"name": "Lithium Metal", "category": "Water-Reactive", "ph": 7.0, "state": "Solid", "formula": "Li", "reactivity": "High"},
    {"name": "Calcium Carbide", "category": "Water-Reactive", "ph": 7.0, "state": "Solid", "formula": "CaC2", "reactivity": "High"},
    {"name": "Lithium Aluminum Hydride", "category": "Water-Reactive", "ph": 7.0, "state": "Solid", "formula": "LiAlH4", "reactivity": "Very High"},
    {"name": "Sodium Borohydride", "category": "Water-Reactive", "ph": 10.0, "state": "Solid", "formula": "NaBH4", "reactivity": "High"},
    {"name": "Phosphorus Pentoxide", "category": "Water-Reactive", "ph": 1.0, "state": "Solid", "formula": "P4O10", "reactivity": "High"},

    # Others
    {"name": "Potassium Cyanide", "category": "Toxic", "ph": 11.0, "state": "Solid", "formula": "KCN", "reactivity": "High"},
    {"name": "Sodium Sulfide", "category": "Toxic", "ph": 12.0, "state": "Solid", "formula": "Na2S", "reactivity": "High"},
    {"name": "Distilled Water", "category": "Solvent", "ph": 7.0, "state": "Liquid", "formula": "H2O", "reactivity": "Low"},
    {"name": "Sodium Chloride", "category": "Salt", "ph": 7.0, "state": "Solid", "formula": "NaCl", "reactivity": "Low"},
    {"name": "Sand", "category": "Inert", "ph": 7.0, "state": "Solid", "formula": "SiO2", "reactivity": "None"}
]

# Total chemicals approx 50-60.
# 60 * 59 = 3540 combinations. 

def get_reaction(c1, c2):
    n1, n2 = c1["name"], c2["name"]
    cat1, cat2 = c1["category"], c2["category"]

    # Special logic first
    
    # 1. Acid + Cyanide (Very Dangerous)
    if (("Acid" in cat1 and "Cyanide" in n2) or 
        ("Acid" in cat2 and "Cyanide" in n1)):
        return "Unsafe", "Fatal Risk: Turns into Hydrogen Cyanide gas."

    # 2. Acid + Sulfide (Very Dangerous)
    if (("Acid" in cat1 and "Sulfide" in n2) or 
        ("Acid" in cat2 and "Sulfide" in n1)):
        return "Unsafe", "Fatal Risk: Turns into Hydrogen Sulfide gas."

    # 3. Acid + Bleach (Dangerous)
    if (("Acid" in cat1 and "Hypochlorite" in n2) or 
        ("Acid" in cat2 and "Hypochlorite" in n1)):
        return "Unsafe", "Dangerous Risk: Turns into Chlorine gas."

    # 4. Ammonia + Bleach (Dangerous)
    if (("Ammonia" in n1 and "Hypochlorite" in n2) or 
        ("Ammonia" in n2 and "Hypochlorite" in n1)):
        return "Unsafe", "Dangerous Risk: Turns into Chloramine gas."

    # 5. Water Reactive + Water/Aqueous
    # Anything liquid usually implies water content unless specific organic solvent
    is_aqueous_1 = c1["state"] == "Liquid" and "Flammable" not in cat1 and "Acid" not in cat1 # Simplifying assumption for dataset
    is_aqueous_2 = c2["state"] == "Liquid" and "Flammable" not in cat2 and "Acid" not in cat2
    
    # Actually, strong acids/bases are often aqueous.
    # Let's say if it's Water-Reactive and the other is NOT Inert or Salt or Solid Flammable
    if "Water-Reactive" in cat1:
        if c2["state"] == "Liquid" or "Acid" in cat2 or "Base" in cat2 or "Hydrate" in n2:
             return "Unsafe", "Violent Reaction: Releases flammable gas/heat on contact with moisture."
    if "Water-Reactive" in cat2:
        if c1["state"] == "Liquid" or "Acid" in cat1 or "Base" in cat1 or "Hydrate" in n1:
             return "Unsafe", "Violent Reaction: Releases flammable gas/heat on contact with moisture."

    # 6. Strong Acid + Strong Base
    if "Strong Acid" in cat1 and "Strong Base" in cat2:
        return "Unsafe", "Violent Exothermic Reaction: Neutralization releases massive heat."
    if "Strong Base" in cat1 and "Strong Acid" in cat2:
        return "Unsafe", "Violent Exothermic Reaction: Neutralization releases massive heat."

    # 7. Oxidizer + Flammable
    if "Oxidizer" in cat1 and "Flammable" in cat2:
        return "Unsafe", "Fire/Explosion Risk: Oxidizer promotes combustion of flammable."
    if "Flammable" in cat1 and "Oxidizer" in cat2:
        return "Unsafe", "Fire/Explosion Risk: Oxidizer promotes combustion of flammable."
        
    # 8. Oxidizing Acid + Organic/Flammable
    # Note: HNO3, HClO4 are oxidizing acids
    if ("Oxidizer" in cat1 or "Oxidizing" in cat1) and ("Flammable" in cat2 or "Weak Acid" in cat2): # Organic acids are weak
        return "Unsafe", "Fire/Explosion Risk: Strong oxidizer with organic material."
    if ("Flammable" in cat1 or "Weak Acid" in cat1) and ("Oxidizer" in cat2 or "Oxidizing" in cat2):
        return "Unsafe", "Fire/Explosion Risk: Strong oxidizer with organic material."

    # 9. Acid + Carbonate/Bicarbonate -> CO2 (Safe but messy/pressure)
    if ("Acid" in cat1 and ("Carbonate" in n2 or "Bicarbonate" in n2)) or \
       (("Carbonate" in n1 or "Bicarbonate" in n1) and "Acid" in cat2):
        return "Caution", "Vigorous fizzing. Releases CO2 gas, can pressurize containers."

    # Safe Stuff
    if ("Inert" in cat1 or "Inert" in cat2) and "Hydrofluoric" not in n1 and "Hydrofluoric" not in n2: # HF eats glass/sand
        return "Safe", "No reaction expected."
    
    if "Salt" in cat1 and "Salt" in cat2:
         return "Safe", "Stable mixture."

    if c1["name"] == "Distilled Water" or c2["name"] == "Distilled Water":
        # Water + Acid/Base -> Heat but generally "Safe" to mix if done slow
        if "Acid" in cat1 or "Base" in cat1 or "Acid" in cat2 or "Base" in cat2:
             return "Caution", "Exothermic dilution. Add chem to water slowly."
        if "Flammable" in cat1 or "Flammable" in cat2:
             return "Safe", "Dilution (or immiscible layer)."
        return "Safe", "Dissolution or mixing."

    # Default
    return "Caution", "Unknown specific interaction. Treat as potentially hazardous."


dataset = []
seen_pairs = set()
target_count = 2100

# Generate all possible pairs first to ensure we fill the dataset efficiently
all_pairs = []
for i in range(len(chemicals)):
    for j in range(len(chemicals)):
        if i == j: continue
        all_pairs.append((chemicals[i], chemicals[j]))

random.shuffle(all_pairs)

for c1, c2 in all_pairs:
    label, expl = get_reaction(c1, c2)
    
    entry = {
        "chem1": c1["name"],
        "chem1_type": c1["category"],
        "chem1_ph": c1["ph"],
        "chem1_state": c1["state"],
        "chem2": c2["name"],
        "chem2_type": c2["category"],
        "chem2_ph": c2["ph"],
        "chem2_state": c2["state"],
        "label": label,
        "description": expl
    }
    dataset.append(entry)
    
    # Try to reverse it too if we still need data, though for chemistry A+B is usually same as B+A safety-wise
    if len(dataset) >= target_count:
        break

# If we still don't have enough (unlikely with 50*50=2500), we can add duplicates or variations
if len(dataset) < target_count:
    print(f"Warning: Only generated {len(dataset)} unique pairs.")

# Write to file
with open("chemical_safety_dataset.json", "w") as f:
    json.dump(dataset, f, indent=2)

print(f"Success. Generated {len(dataset)} entries.")
