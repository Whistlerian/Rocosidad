
export const workoutProgram = {
  "program_name": "Estetica Pecho-Hombro",
  "goal": "Recomposición corporal con foco en pecho alto y hombro lateral. Definir progresivamente para junio.",
  "weekly_schedule": {
    "monday": {
      "type": "gym",
      "focus": "Push - Pecho alto + Hombro",
      "workout": [
        { "exercise": "Incline Dumbbell Press", "incline_degrees": "20-30", "sets": 4, "reps": "6-8", "rir": "1-2", "notes": "Ejercicio principal de pecho. Control total." },
        { "exercise": "Flat Barbell Bench Press", "sets": 3, "reps": 8, "rir": 2, "notes": "Mantenimiento. No llegar al fallo." },
        { "exercise": "Seated Dumbbell Shoulder Press", "sets": 3, "reps": "6-8", "notes": "Sin bloquear codos." },
        { "exercise": "Dumbbell Lateral Raise", "sets": 4, "reps": "12-15", "notes": "Pausa de 1s arriba." },
        { "exercise": "Chest Dips (forward lean)", "sets": 2, "reps": "8-10", "optional": true, "notes": "Solo si no molesta el hombro." }
      ]
    },
    "wednesday": {
      "type": "gym",
      "focus": "Pull - Espalda estética + salud de hombro",
      "workout": [
        { "exercise": "Pull-Ups or Lat Pulldown (pronated)", "sets": 4, "reps": "6-8" },
        { "exercise": "Barbell or T-Bar Row", "sets": 3, "reps": "6-8" },
        { "exercise": "Neutral Grip Seated Row", "sets": 3, "reps": "10-12" },
        { "exercise": "Face Pull", "sets": 3, "reps": "12-15", "notes": "Control y rotación externa." },
        { "exercise": "Biceps Curl (barbell or dumbbells)", "sets": 3, "reps": "8-10" }
      ]
    },
    "friday": {
      "type": "gym",
      "focus": "Pecho + Hombro estético",
      "workout": [
        { "exercise": "Incline Dumbbell Press", "incline_degrees": "20-25", "sets": 3, "reps": "10-12", "notes": "Foco en forma, no peso máximo." },
        { "exercise": "Incline Dumbbell Fly", "incline_degrees": "20-25", "sets": 3, "reps": "10-12", "notes": "Estiramiento controlado." },
        { "exercise": "Low-to-High Cable Fly", "sets": 3, "reps": "12-15", "notes": "Pausa de 1s arriba." },
        { "exercise": "Cable Pullover (straight bar)", "sets": 3, "reps": "12-15", "notes": "Brazos semi-extendidos, foco en estiramiento." },
        { "exercise": "Lateral Raise (dumbbells or cable)", "sets": 4, "reps": "15-20", "notes": "Prioridad estética." }
      ]
    },
    "optional_day": {
      "type": "gym",
      "optional": true,
      "focus": "Accesorios - Brazos + Hombro lateral/posterior",
      "notes": "Usar solo si hay buena recuperación.",
      "workout": [
        { "exercise": "Dumbbell Lateral Raise", "sets": 4, "reps": "15-20", "notes": "Movimiento limpio, sin balanceo." },
        { "exercise": "Cable Lateral Raise (unilateral)", "sets": 3, "reps": "12-15", "notes": "Tensión continua, recorrido controlado." },
        { "exercise": "Incline Dumbbell Reverse Fly", "sets": 3, "reps": "12-15", "notes": "Deltoide posterior, salud del hombro." },
        { "exercise": "Barbell or EZ-Bar Curl", "sets": 3, "reps": "8-10", "notes": "Sin balanceo." },
        { "exercise": "Cable Triceps Rope Pushdown", "sets": 3, "reps": "10-12", "notes": "Extensión completa y control." },
        { "exercise": "Face Pull", "sets": 2, "reps": "15", "notes": "Finisher de salud articular." }
      ]
    }
  }
};
